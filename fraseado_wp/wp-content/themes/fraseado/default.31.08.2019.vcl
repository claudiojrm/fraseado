#
# This is an example VCL file for Varnish.
#
# It does not do anything by default, delegating control to the
# builtin VCL. The builtin VCL is called when there is no explicit
# return statement.
#
# See the VCL chapters in the Users Guide at https://www.varnish-cache.org/docs/
# and http://varnish-cache.org/trac/wiki/VCLExamples for more examples.

# Update for work with Varnish 4

## temp
## set req.http.Meu = regsub(req.http.Cookie, ".*URBLCT=([^;]+);.*", "\1");


# Marker to tell the VCL compiler that this VCL has been adapted to the
# new 4.0 format.
vcl 4.0;

# Default backend definition. Set this to point to your content server.
backend default {
    .host = "127.0.0.1";
    .port = "8080";
}

import std;
import header;

##############################################################################################
## INCLUDE DEVICE DETECT #####################################################################
##############################################################################################
include "/etc/varnish/inc/devicedetect.vcl";
##
## By setting the device detection, so you can be sebrescrito the domain of cvl if necessary
##
sub vcl_backend_response {

    ##
    ## Device detected
    ##
    if (bereq.http.X-UA-Device) {
        if (!beresp.http.Vary) { # no Vary at all
            set beresp.http.Vary = "X-UA-Device";
        } elseif (beresp.http.Vary !~ "X-UA-Device") { # add to existing Vary
            set beresp.http.Vary = beresp.http.Vary + ", X-UA-Device";
        }
    }
    ## comment this out if you don't want the client to know your classification
    set beresp.http.X-UA-Device = bereq.http.X-UA-Device;
}

##############################################################################################
## INCLUDE DOMAINS ###########################################################################
##############################################################################################
include "/etc/varnish/domains/all_domains.vcl";

# Only allow purging from specific IPs
acl purge {
    "localhost";
    "127.0.0.1";
}


##############################################################################################
## VCL RECEIVE REQUEST CLIENT ################################################################
##############################################################################################
sub vcl_recv {
    
    ##
    ## Block bots, crawler, etc...
    ##
    include "/etc/varnish/inc/agents.vcl";

    ##
    ## Call device detect
    ##
    call devicedetect;

    ##
    ## Standardizing the User-Agent to avoid duplication in the cache
    ##
    set req.http.User-Agent = req.http.X-UA-Device;

    ##
    ## Real client ip (for detection geolocation)
    ##
    set req.http.X-Forwarded-For = regsuball(req.http.X-Forwarded-For, ", *([0-9.])*", "");

    ##
    ## Normalize header, remove the port (in case you're testing this on various TCP ports) ##
    ##
    set req.http.Host = regsub(req.http.Host, ":[0-9]+", "");
    set req.http.Host = regsub(req.http.Host, "^www\.","");

    ##
    ## Grace header
    ##
    set req.http.Grace = "none";

    ##
    ## Force lookup if the request is a no-cache request from the client
    ##
    if (req.http.Cache-Control ~ "no-cache") {
        ##return (pass);
    }

    ##
    ## Handling CONNECT and Non-RFC2616 HTTP Methods
    ## i.e. request method isn't one of the 'normal' web site or web service methods
    ##
    if (req.method !~ "^GET|HEAD|PUT|POST|TRACE|OPTIONS|DELETE$") {
        return(pipe);
    }

    ##
    ### Check for reasons to bypass the cache! Never cache anything except GET/HEAD ##########
    ##
    if (req.method != "GET" && req.method != "HEAD") {
        return(pass);
    }

    ##
    ## Don't cache when authorization header is being provided by client #####################
    ##
    if (req.http.Authorization || req.http.Authenticate) {
        return(pass);
    }

    ##
    ## Normalize Accept-Encoding header and compression
    ## https://www.varnish-cache.org/docs/3.0/tutorial/vary.html
    ##
    if (req.http.Accept-Encoding) {
        # Do no compress compressed files...
        if (req.url ~ "\.(jpg|png|gif|gz|tgz|bz2|tbz|mp3|ogg)$") {
            unset req.http.Accept-Encoding;
        } elsif (req.http.Accept-Encoding ~ "gzip") {
            set req.http.Accept-Encoding = "gzip";
        } elsif (req.http.Accept-Encoding ~ "deflate") {
            set req.http.Accept-Encoding = "deflate";
        } else {
            unset req.http.Accept-Encoding;
        }
    }

    ##
    ## Normalize Accept-Language header
    ##
    if (req.http.Accept-Language) {
        if (req.http.Accept-Language ~ "en") {
            set req.http.Accept-Language = "en";
        } elsif (req.http.Accept-Language ~ "de") {
            set req.http.Accept-Language = "de";
        } elsif (req.http.Accept-Language ~ "fr") {
            set req.http.Accept-Language = "fr";
        } else {
            # unknown language. Remove the accept-language header and
            # use the backend default.
            unset req.http.Accept-Language;
        }
    }

    ##
    ## Allow purging from ACL
    ##
    if (req.method == "PURGE") {
        # If not allowed then a error 405 is returned
        if (!client.ip ~ purge) {
            return(synth(405, "This IP is not allowed to send PURGE requests."));
        }   
        # If allowed, do a cache_lookup -> vlc_hit() or vlc_miss()
        return (purge);
    }

    ##
    ## Cache all others requests
    ##
    return (hash);
}
 
sub vcl_pipe {
    
    set bereq.http.connection = "close";
    return (pipe);
}
 
sub vcl_pass {
    return (fetch);
}

# override the header before it is sent to the backend
sub vcl_backend_fetch { 
    if (bereq.http.X-UA-Device) { 
      set bereq.http.User-Agent = bereq.http.X-UA-Device; 
    } 
}


##############################################################################################
# VCL BACKEND RESPONSE #######################################################################
############################################################################################## 
sub vcl_backend_response {
        
    ##
    ## These status codes should always pass through and never cache. 
    ##
    if (beresp.status == 404) {
        set beresp.http.X-Cache-Rule = "YES: but for 1m - beresp.status : " + beresp.status;
        set beresp.ttl = 1m;
        return (deliver);
    }

    ##
    ## Don't cache error 
    ##
    if (beresp.status == 503 || beresp.status == 500) {
        set beresp.ttl = 0s;
        set beresp.uncacheable = true;
        return (deliver);
    }

    ##
    ## Don't cache response to posted requests or those with basic auth 
    ##
    if ( bereq.method == "POST" || bereq.http.Authorization ) {
        set beresp.uncacheable = true;
        set beresp.ttl = 120s;
        return (deliver);
    }

    ##
    ## Check for reasons to bypass the cache! Never cache anything except GET/HEAD 
    ##
    if (bereq.method != "GET" && bereq.method != "HEAD") {
        set beresp.uncacheable = true;
        set beresp.ttl = 120s;
        return (deliver);
    }

    ##
    ## Don't cache when authorization header is being provided by client 
    ##
    if (bereq.http.Authorization || bereq.http.Authenticate) {
        set beresp.uncacheable = true;
        set beresp.ttl = 120s;
        return (deliver);
    }

    ##
    ## Don't cache ajax requests 
    ##
    ##if (bereq.http.X-Requested-With == "XMLHttpRequest") {
        ##set beresp.uncacheable = true;
        ##set beresp.ttl = 120s;
        ##return (deliver);
    ##}
    
    ##
    ## Only cache status ok 
    ##
    if ( beresp.status != 200 ) {
        set beresp.uncacheable = true;
        set beresp.ttl = 120s;
        return (deliver);
    }

    ##
    ## Each time the Varnish search an item in the backend, it also sets the grace of the 
    ## item for 3 hours. So even now become the "tll" set, the old item can be cached for 
    ## up to these three hours;  
    ##
    set beresp.grace = 3h;

    ##
    ## Remove some headers we never want to see 
    ##
    unset beresp.http.Server;
    unset beresp.http.X-Powered-By;
    
    return (deliver);
}


##############################################################################################
# VCL BACKEND DELIVER ######################################################################## 
##############################################################################################
sub vcl_deliver {
    
    ##
    ## Device detect
    ##
    ##if ((req.http.X-UA-Device) && (resp.http.Vary)) {
    ##    set resp.http.Vary = regsub(resp.http.Vary, "X-UA-Device", "User-Agent");
    ##}

    ##
    ## Grace header 
    ##
    set resp.http.Grace = req.http.Grace;

    ##
    ## Add cache hit data 
    ##
    if (obj.hits > 0) {

        ##
        ## If hit add hit count 
        ##
        set resp.http.X-Cache = "HIT";
        set resp.http.X-Cache-Hits = obj.hits;

    } else {
        set resp.http.X-Cache = "MISS";
    }

    ##
    ## Remove some headers: PHP version 
    ##
    unset resp.http.X-Powered-By;

    ##
    ## Remove some headers: Apache version & OS 
    ##
    unset resp.http.Server;

    ##
    ## Change varnish heanders: Varnish 
    ##
    set resp.http.Via = "1.1 MDSCACHE";

    ##
    ## Remove some heanders: Varnish 
    ##
    ## unset resp.http.X-Varnish;

    return (deliver);
}


##############################################################################################
# VCL HIT ####################################################################################
##############################################################################################
sub vcl_hit {
    if (obj.ttl >= 0s) {
        # normal hit
        return (deliver);
    }
    ##
    ## We have no fresh fish. Lets look at the stale ones. 
    ##
    if (std.healthy(req.backend_hint)) {

        ##
        ## Backend is healthy. Limit age to 10s. 
        ##
        if (obj.ttl + 10s > 0s) {
            set req.http.Grace = "normal(limited)";
            return (deliver);
        } else {
            ##
            ## No candidate for grace. Fetch a fresh object. 
            ##
            return(fetch);
        }
    } else {

        ##
        ## backend is sick - use full grace 
        ##
        if (obj.ttl + obj.grace > 0s) {
            set req.http.Grace = "full";
            return (deliver);
        } else {
            ##
            ## No graced object. 
            ##
            return (fetch);
        }
    }
}


##############################################################################################
# VCL HASH ###################################################################################
##############################################################################################
sub vcl_hash {
    
    # Called after vcl_recv to create a hash value for the request. This is used as a key
    # to look up the object in Varnish.

    hash_data(req.url);

    # hash cookies for requests that have them
    if (req.http.X-UA-Device) {
        hash_data(req.http.X-UA-Device);
    }

    if (req.http.host) {
        hash_data(req.http.host);
    } else {
        hash_data(server.ip);
    }

    # hash cookies for requests that have them
    if (req.http.Cookie) {
        hash_data(req.http.Cookie);
    }
}


##############################################################################################
# VCL INIT ###################################################################################
##############################################################################################
sub vcl_init {
    return (ok);
}


##############################################################################################
# VCL FINI ###################################################################################
##############################################################################################
sub vcl_fini {
    return (ok);
}

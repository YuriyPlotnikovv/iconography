<?php

return [

    # cockpit instance name
    'app.name' => 'My Project X',

    # cockpit session name
    'session.name' => 'mysession',

    # app custom security key
    # CHANGE THIS IN YOUR CONFIGURATION SETTING
//    'sec-key' => 'xxxxx-SiteSecKeyPleaseChangeMe-xxxxx',

    # site url (optional) - helpful if you're behind a reverse proxy
//    'site_url' => 'https://cms.mydomain.com',

    # Only allow 'png, jpg, jpeg' using the Assets API
    'assets' => [
        'vips' => 'C:\vips\bin\vipsthumbnail',
        'allowed_uploads' => 'png, jpg, jpeg',
    ],

    # Only allow 'png, jpg, jpeg' using the Finder API
    'finder.allowed_uploads' => 'png, jpg, jpeg',

    # Define Access-Control (CORS) settings.
    # Those are the default values. You don't need to duplicate them all.
    'cors' => [
        'Access-Control-Allow-Origin' => '*',
        'Access-Control-Allow-Credentials' => 'true',
        'Access-Control-Max-Age' => '1000',
        'Access-Control-Allow-Headers' => 'X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding, API-KEY',
        'Access-Control-Allow-Methods' => 'PUT, POST, GET, OPTIONS, DELETE',
        'Access-Control-Expose-Headers' => 'true',
    ],

    # Default administration panel language for new users
    # This requires existing translations as described in the documentation
    'i18n' => 'ru',
    'languages' => [
        'ru' => 'Russian',
        'en' => 'English',
    ],

//    # Allowed origins to access the api
//    'api.security.origins' => ['domain1.tld', 'domain2.tld'],

    # store model schema in database instead of filesystem (default)
    'content' => [
        'models' => ['storage' => 'database'],
    ],
];

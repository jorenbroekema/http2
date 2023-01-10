# HTTP/1.1 v HTTP/2 + SEO (Googlebot)

This repo is used to run a test with a bundled frontend application that preserves module files/folders.

The goal is to build and deploy the app to a server where we can configure HTTP/1.1 versus HTTP/2 (e.g. via Apache or Nginx or NodeJS).
We can then test if Googlebot (Google SEO crawler) can crawl the whole app and all its resources (220+).
SEO issues may arise, and the hypothesis is that HTTP/2 resolves those issues.

## How to reproduce

Have somewhere to deploy to which has a domain pointed to it with a valid SSL certificate.
Make sure to have something like Apache or Nginx installed to serve the website.

```sh
npm install && npm run build
```

This creates a `dist` folder which is what you will deploy on your server.

### Apache2

I followed [the following guide for enabling HTTP/2 on Apache2](https://www.linode.com/docs/guides/how-to-configure-http-2-on-apache/).
It also explains how to get SSL set up if needed.

To toggle between HTTP/2 and HTTP/1.1, you need to change in your `/etc/apache2/mods-available/http2.conf`:

```text
Protocols http/1.1 h2c h2
```

To:

```text
Protocols h2 h2c http/1.1
```

and vice versa.

## Conclusion

HTTP/2 doesn't seem to help at all. The reason seems to be Googlebot's crawl capacity limit, of which one of the factors is the number of requests.
To mitigate the issues, it seems you can do two things:

- Reduce the number of requests in your app
- Reduce the number of requests that robots can crawl by excluding unnecessary resources for rendering in a `robots.txt`

## Read more

- [Google Support Thread #1](https://support.google.com/webmasters/thread/60601458?hl=en&msgid=60621321)
- [Google Support Thread #2](https://support.google.com/webmasters/thread/173793044?hl=en&msgid=173822151)

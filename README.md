Web Server
==========

Basic static Node web server. Designed to be easy to just install and run.

Installation
------------

Couldn't be more simple

```
npm install -g web-server-cli
```

Usage
-----

The simplest way to run web-server-cli is to just run "web-server" from the command line.

```
web-server
```

There are several options that you can configure.
To see all available options, run `web-server --help`

### -r, --root [root]

Which directory to serve static files from. Defaults to the current directory.

```
web-server -d ./public
```

### -p, --port [port]

Which port to listen on. Defaults to port 8000

```
web-server -p 3000
```

### -i, --index [index]

Which file to treat as the directory index file.
Defaults to "index.html"

```
web-server -i index.htm
```

License
-------

The MIT License (MIT)

Copyright (c) 2014 Will Anderson

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

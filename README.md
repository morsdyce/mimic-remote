# mimic-remote

Sometimes you would want to use Mimic in a separate browser window.
For example when you have multi-tab application or want to use Mimic with React Native or NativeScript.

To do this you will have to install Mimic remote server.

```
npm install -g mimic-remote
```

Once you have it installed, you have to run it.

```
# Running Mimic remote server
mimic-remote

# You can also run it under a different port (by default 5000)
mimic-remote -p 4000
```

The last step is connecting your application to mimic-remote.

```
# Importing mimic remote
import connect from 'mimic/remote';

# Connecting to Mimic remote server
connect()

# You can also configure a different host and port
connect({ host: 'localhost', port: 5000 })
```

Now you can navigate to http://localhost:5000 in your browser and start mocking.

It is important to note that Mimic will hold off all your application requests until you open Mimic in your browser.

This is a current limitation of the implementation to allow you to mock any request that goes out at the start of the application.
### React Micro Front with Shared Global State

*** Note this is based off an old MFE example project ***

#### Aim to share state from one Micro FE with other at runtime
Wanted to play around and see how we can manage to share state in Micro FE with webpack. Since we always need some global state that is required by other micro FEs. So I have utilized the Proxy/Subscription behaviour of `Valtio` and amaing library that can convert any object to proxy and give us some use full methods in return.

Task:
- Share the user state from the Container with the Marketing FE at runtime.
- Make sure the logic is decoupled and Marketing app does not need to install or know about any state management logic from Container app.
- Marketing/Container app should be independent to use any state management library.

Solution:
- Installed the 'valtio' library at the Container level.
- Create a new folder to manage global state with valtio.
- Expose the 'global-state' file from the Container App that contains the 'subscription' funtion to subscribe to global state.
- Create a store file to initialize the State proxy with valtio. And define some functions to update the state.
- We have used window object to pass the state to the 'global-state' subscribe function, since if we use the import from the Store in the 'global-state' file we would get new instance of the global state proxy every time we try to run the store file at runtime. That's why we fallback to window, since it presevres the state at runtime.
- Make sure we are not accessing/reading from window obejct anywhere and only use it in subscribe method.


Local Development 
- Run npm start from the container folder and navigate to localhost:8080
- Run npm start from the marketing folder to fire up the mfe app.
- Toggle the Button in the Header to see how the User state defined in Container updates in both places.


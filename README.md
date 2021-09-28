### React Micro Front with Shared Global State

*** Note this is based off an old MFE example project ***

#### Aim to share state from one Micro FE with other at runtime or as single Instance of global State.

Wanted to play around and see how we can manage to share state in Micro FE with webpack. Since we always need some global state that is required by other micro FEs. So I have utilized the Proxy/Subscription behaviour of `Valtio` and amaing library that can convert any object to proxy and give us some use full methods in return.

### Task A: Share global state from Container with other App
- Share the user state from the Container with the Marketing FE at runtime.
- Make sure the logic is decoupled and Marketing app does not need to install or know about any state management logic from Container app.
- Marketing/Container app should be independent to use any state management library.

### Solution:
- Installed the 'valtio' library at the Container level.
- Create a new folder to manage global state with valtio.
- Expose the 'global-state' file from the Container App that contains the 'subscription' funtion to subscribe to global state.
- Create a store file to initialize the State proxy with valtio. And define some functions to update the state.
- We have used window object to pass the state to the 'global-state' subscribe function, since if we use the import from the Store in the 'global-state' file we would get new instance of the global state proxy every time we try to run the store file at runtime. That's why we fallback to `window`, since it presevres the state at runtime.
- Make sure we are not accessing/reading from window obejct anywhere and only use it in subscribe method.

##### Testing the Shared State 
- Run npm start from the container folder and navigate to localhost:8080
- Run npm start from the marketing folder to fire up the mfe app.
- Toggle the Button in the Header to see how the User state defined in Container updates in both places.

### Task B: Share Global State using a library (as dep or at runtime) (Prreferabbly better soloutin than A)
- Created a shared global state library, that contains global shared state.
- Used `Valtio` to create the state object and exported basic functions to subscribre and update state.
- Installed the lib in the Container and Marketing App.
- Shared the lib as common deps, to have a single instance of it by adding it to the MFE config shared array.
- Sharing it as singleton, allow us to preserve the instance and avoid creating window object.
- Then we can update the global state in one and see it getting affecting in other app.


### Task C: Create a global Route Registry to create static route cache
Create a static route object that could be accessed in any sub app to find any route that exist in the App, either
- Route managed by Container
- Route managed by any sub app.

### Solution
- We created a `exposeRoutes.js` file under evey sub app that exposes the route for that app to the window object.
- We created a separate entry in the webpack config to expose this file, to outside world separate from the main build.
For example 
```js
 marketingAppRoutes: './src/exposeRoutes.js'
``` 
- Than in the Container App, we created a file `registerRoutes.ts` which exposes a function that registes the routes from different app to a shared state object.
- This function basically dynamically imports the routes file exposed by each sub app and register it to the global state object.
- We call this  'registerRoutes' function when we bootstrap the contaoner, so that the routes are registered before any sub apps.
- Then we expose this shared state, that can be accessed by the sub apps.
- In sub apps we access the shared state from the container, and can find all the routes available in other apps.

#### Testing the routes object
- You can see that that the Marketign sub app, does not have any hard coded route for the Checkout page(Order), it does not even know what the route is. 
- We basically access the shared route object and find the entry for 'order' app and then just access the checkout property in the routes object.





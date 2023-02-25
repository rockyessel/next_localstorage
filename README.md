

# How to persist data in Next.js with localStorage and no libraries.
![gggg](https://user-images.githubusercontent.com/97303710/221332826-fad47087-0376-4039-8c2c-938297bf97ff.png)

Persisting data in Next.js using localStorage is very frustrating, and I have read many posts where other developers use other libraries or cookies to accomplish the same effect as localStorage .

In my use case, I needed the localStorage to store the user preference without creating a modal to store the user's preference and making API requests to POST and GET, whenever the user is on the website when I could use localStorage.

So, to use and persist data in Next.js, we are not doing it the normal way. 

So let's start,

```js
git clone https://github.com/rockyessel/next_localstorage.git
```
After run `npm install` to install all packages.
## So what are we creating?

We'll be creating a drop dropdown menu, do we can store whatever option the user selects in our localStorage, and will be the same after the page refreshes.

`/pages/index.ts`

```jsx
import React from 'react';

const Home = () => {
  const [selected, setSelected] = React.useState('red');
  const [selectedState, setSelectedState] = React.useState(false);

  return (
    <main className='bg-slate-900 text-white w-full h-screen p-10'>
      <button
        onClick={() => setSelectedState((prev) => !prev)}
        className='relative px-4 py-4 rounded-md text-black font-semibold bg-gray-400'
      >
        Select Your Code
        {selectedState && (
          <ul className='bg-[#3d3d3d] text-[1rem] text-white w-[10rem] z-[1] drop-shadow-lg absolute top-12 left-0 px-2 flex flex-col items-center py-2 rounded-md divide-y divide-white/20'>
            <li onClick={() => setSelected('red')} className='w-full py-2'>
              Red
            </li>
            <li onClick={() => setSelected('blue')} className='w-full py-2'>
              Blue
            </li>
            <li onClick={() => setSelected('yellow')} className='w-full py-2'>
              Yellow
            </li>
            <li onClick={() => setSelected('gray')} className='w-full py-2'>
              Gray
            </li>
            <li onClick={() => setSelected('green')} className='w-full py-2'>
              Green
            </li>
          </ul>
        )}
      </button>

      <p>This is the color you picked: {selected}</p>
      <div
        className={`w-64 h-32 rounded-md`}
        style={{ backgroundColor: `${selected}` }}
      ></div>
    </main>
  );
};

export default Home;
```

So with the `const [selected, setSelected] =React.useState('red')` what this state does is change the default value for `red` to any colour of the user's choosing. Then we use the `selected` value to change the background colour of the box we created. And of course we used Tailwind for the styling, to learn more about this amazing CSS framework, this is tutorial out. 

So it get into using localStorage with nextjs

Generally problem is that, when you use a hook, to keep track of a value, after refresh then it goes to it normal state. So in order to ecaspe that, we have to create a certain logic, then we can you localStorage without getting any error. So here is the modification to the
`const [selected, setSelected] = React.useState('red')` 

But first let set localStorage in `useEffect()` hook

```jsx
  React.useEffect(()=>{
    window.localStorage.setItem('user_selected_colour', selected)
  },[selected])
```
Then for the selected State.
```jsx
const [selected, setSelected] = React.useState(():string =>{
    if (typeof window !== 'undefined'){
      const from_localStorage = window.localStorage.getItem('user_selected_colour')
      if (from_localStorage === null || from_localStorage === undefined){
        return 'Red'
      }

      return `${from_localStorage}` ? from_localStorage : 'Red'
    }
    return ''
  });
```
Now with this, we can now persist our data, and wouldn't have to rely on any thrid-parties apart from our browser localStorage. So let me explain it.

So first, we want to make sure that window is defined, and if it is, then we get the item from our localStorage then store it into `from_localStorage`. Please listen hear, so if the user, opens the web app for the first time,  nothing is save to localStorage, so by default, we get `undefined` or `null`, so in the next line of code, we are checking if the `from_localStorage` return `null` or `undefined` which will for only one time(when the user opens the web for the first time), then we set it to our default value that we want, and in this case, it is `red`, and once we do that, then `from_localStorage` is not `null` or `undefined`, so if the user should choose another option like `blue`, then `from_localStorage` is defined, so we move to the next line which is: `return`${from_localStorage}`?from_localStorage:'red'`, all we are saying is that, if a value exist, then return that value or else return `red`.

But there is a problem with this, mind you the localStorage is working perfectly, then you will get a react-hydration, something like this:
![hydration](https://user-images.githubusercontent.com/97303710/221332814-dd40671e-9b5d-4c2a-9508-bb597b4bf766.PNG)
The reason we are getting this error, is that HTML that is rendered in the server-side, and which is `red`, changes after the user select their option, and might maybe refresh the page, casing the client-side, show `blue` which the user chose, and because the server-side expect `red` but got `blue` instead, that why we are getting this hydration error, so to solve this problem we introduce another `useState` hook, and what it does, is to store every selected option by the user, and updates the state then display it.

So you will definitely understand after the code:
```jsx
  const [local] = React.useState(():string =>{
    if (typeof window !== 'undefined'){
      const from_localStorage = window.localStorage.getItem('user_selected_colour')
      if (from_localStorage === null || from_localStorage === undefined){
        return 'red'
      }

      return `${from_localStorage}` ? from_localStorage : 'red'
    }
    return ''
  });
  const [selected, setSelected] = React.useState<string>(local);
  const [selectedOption, setSelectedOption] = React.useState<string>();
  const [selectedState, setSelectedState] = React.useState(false);


  React.useEffect(()=>{
    window.localStorage.setItem('user_selected_colour', `${selected}`)

    setSelectedOption(`${selected}`);
  },[local, selected])
```

### Conclusion

Now I hope you now know how to persist data in Next.js. [Visit my website](https://esselr.vercel.app/thoughts/how-to-persist-and-access-data-in-next-js-using-localstorage-typescript) and [check demo](https://nextlocalstorage.vercel.app/)

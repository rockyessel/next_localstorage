import React from 'react';

const Home = () => {
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

      <p>This is the color you picked: {selectedOption}</p>
      <div
        className={`w-64 h-32 rounded-md`}
        style={{ backgroundColor: `${selectedOption}` }}
      ></div>
    </main>
  );
};

export default Home;

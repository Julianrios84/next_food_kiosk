import { useRouter } from 'next/router'
import useKiosk from '../hooks/useKiosk'

const steps = [
  { step: 1, name: 'Menú', url: '/' },
  { step: 2, name: 'Resumen', url: '/resume' },
  { step: 3, name: 'Datos y Total', url: '/total' }
];

const Steps = () => {

  const router = useRouter()
  const { handleChangeStep, step } = useKiosk()

  const calculatePercentage = () => {
    let value;
    if(step === 1) {
      value = 5;
    }else if(step === 2) {
      value = 50;
    }else {
      value = 100;
    }
    return value;
  }

  return (
    <>
      <div className="flex justify-between mb-5">
        {steps.map((step) => (
          <button type='submit' onClick={() => {
            handleChangeStep(step.step)
            router.push(step.url)
          }}  className="text-2xl font-black" key={step.step}>{step.name}</button>
        ))}
      </div>

      <div className='bg-gray-100 mb-10'>
          <div className='rounded-full bg-amber-500 text-xs leading-none h-2 text-center text-white' style={{width: `${calculatePercentage()}%`}}>
          </div>
      </div>
    </>
  );
};

export default Steps;

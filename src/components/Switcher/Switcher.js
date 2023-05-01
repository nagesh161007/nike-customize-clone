import './Switcher.css';
import shoeColorConfigs from '../Customizer/ShoeConfig';

function Switcher({ selectShoe, selectedShoeIndex }) {
  return (
    <div className='switcher'>
      {shoeColorConfigs.map((shoe, index) => {
        return (
          <img
            onClick={() => {
              selectShoe(index);
            }}
            key={shoe.id}
            className={`switcher-image ${selectedShoeIndex === index ? 'selected' : ''}`}
            src={shoe.src}
            width={64}
            height={64}
          ></img>
        );
      })}
    </div>
  );
}

export default Switcher;

import React from 'react';
import colorscustomiser from '../Customizer/ShoeConfig';
import './Menu.css';

function Menu({ selectMenu, closeMenu }) {
  return (
    <div className='menu-container'>
      <button className='close-menu-button' onClick={closeMenu}>
        X
      </button>
      <ul className='menu-list'>
        {colorscustomiser.length &&
          colorscustomiser[0].colorConfigs.map((item, index) => {
            return (
              <li
                className='menu-item'
                key={index}
                onClick={() => {
                  selectMenu(index);
                }}
              >
                {index + 1}.{item.title}
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Menu;

import React from 'react'


const activeStyle = {
  backgroundColor: '#2563eb',
  color: "white"
};

const inactiveStyle = {
  backgroundColor: 'white',
  border: '2px solid gray',
};

const CheckoutStepsSignup = ({active}) => {
    return (
      <div className="flex justify-around items-center w-full">
        {/* Step 1 */}
        <div className="flex flex-col items-center">
        <div className="text-sm font-semibold mb-1 dark:text-gray-300">Step 1</div>
          <div className="rounded-full flex items-center justify-center h-8 w-8"  style={active === 1 ? activeStyle : inactiveStyle}>
            <i className="check-icon">1</i> {/* Replace with actual check icon */}
          </div>
        </div>
  
        {/* Connector */}
        <div className="w-[60%] border-t-2 border-gray-300 mt-5"></div> {/* Adjust width as necessary */}
  
        {/* Step 2 */}
        <div className="flex flex-col items-center">
        <div className="text-sm font-semibold mb-1 dark:text-gray-300">Step 2</div>
          <div className="rounded-full flex items-center justify-center h-8 w-8" style={active === 2 ? activeStyle : inactiveStyle}>  
            
            <span>2</span>
          </div>
        </div>

        {/* Further steps and connectors would go here... */}

      </div>
    );
}

export default CheckoutStepsSignup;

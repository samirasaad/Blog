// import ColorPicker from "react-color-picker";
// import React from "react";
// import "react-color-picker/index.css";

// export class Picker extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       color: "red",
//     };
//   }

//   onDrag =(color, c) =>{
//       console.log(color)
//       console.log(c)
//     this.setState({
//       color,
//     });
//   }

//   render() {
//     return (
//       <div>
//         <ColorPicker value={this.state.color} onDrag={this.onDrag} />
//         <div
//           style={{
//             background: this.state.color,
//             width: 100,
//             height: 50,
//             color: "white",
//           }}
//         >
//           {this.state.color}
//         </div>
//       </div>
//     );
//   }
// }

import React, { useState } from "react";
import "react-color-picker/index.css";
import { BlockPicker } from "react-color";

const Picker = ({colorValue, handleColorChange}) => {

  return (
    <BlockPicker onChangeComplete={handleColorChange} color={colorValue} />
  );
};

export default Picker;

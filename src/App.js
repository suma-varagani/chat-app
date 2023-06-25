import "./App.css";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { GoDotFill } from "react-icons/go";
import EmojiPicker from "emoji-picker-react";
import { BsEmojiSmile } from "react-icons/bs";

const array = ["Poland Office", "Introductions", "India Office"];

const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];

const getRandomName = () => {
  const randIndex = Math.floor(Math.random() * user_list.length);
  console.log(randIndex);
  return user_list[randIndex];
};

// let allChats = [];

function getRandomColor() {
  // Generate random values for red, green, and blue components
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);

  // Construct the color string in hexadecimal format
  var color = "#" + r.toString(16) + g.toString(16) + b.toString(16);

  return color;
}

// Usage example
var randomColor = getRandomColor();
console.log(randomColor);

const ChatItem = (props) => {
  const { details } = props;
  const { user, msg, bgColor } = details;
  return (
    <div className="login_details_container chat">
      <p
        style={{ backgroundColor: `${bgColor}` }}
        className="login_icon chaticon randomcolor"
      >
        {user[0]}
      </p>
      <div className="login_text_container">
        <h3 className="user_name">{user}</h3>
        <br />
        <p className="msg">{msg}</p>
      </div>
    </div>
  );
};

const SidebarItem = (props) => {
  const { itemName, isActive, onClickSideBarItem } = props;
  const className = isActive ? "activeSidebar sidebarItem" : "sidebarItem";
  const onclickItem = () => {
    onClickSideBarItem(itemName);
  };
  return (
    <div onClick={onclickItem} className={className}>
      <span className="hash">#</span>
      <p className="itemName">{itemName}</p>
    </div>
  );
};

// const Emojis = () => {
//   return (
//     <div className="Emojis_container">
//       <EmojiPicker />
//     </div>
//   );
// };

const App = () => {
  const [activeSidebar, setActiveSidebar] = useState(array[1]);
  const [input, setInput] = useState("");
  const [showEmojiInterface, setShowEmojiInterface] = useState(false);
  const [allChats, setAllChats] = useState([
    {
      user: "PubNub Bot",
      msg:
        "Welcome To Team Chat send a message. Now to start interactive with other users in the app.",
      bgColor: getRandomColor(),
    },
  ]);
  const onChangeInput = (event) => {
    setInput(event.target.value);
  };
  const onSubmitMsg = (event) => {
    event.preventDefault();
    if (input.trim() !== "") {
      const object = {
        user: getRandomName(),
        msg: input,
        bgColor: getRandomColor(),
      };
      const updatedAllChats = [...allChats, object];
      setAllChats(updatedAllChats);
      setInput("");
    }
  };

  const onClickSideBarItem = (itemName) => {
    setActiveSidebar(itemName);
  };

  const onClickEmojiButton = () => {
    setShowEmojiInterface(!showEmojiInterface);
  };

  const handleEmojiSelection = (selectedEmoji) => {
    console.log(selectedEmoji);
    setInput((prevValue) => prevValue + selectedEmoji);
  };

  return (
    <div className="App">
      <div className="sidebar">
        <div className="login_details_container">
          <p className="login_icon">
            SV
            <span className="activeDot">
              <GoDotFill size={32} />
            </span>
          </p>
          <div className="login_text_container">
            <h3 className="user_name">Suma Varagani</h3>
            <p className="profession">MERN stack developer</p>
          </div>
        </div>
        <div className="conversations_and_addIcon">
          <h3>Conversations</h3>
          {/* <icon className='addIcon'>+</icon> */}
          <AiOutlinePlusCircle size={20} />
        </div>
        <ul className="sidebarItems_ul_container">
          {array.map((item) => (
            <SidebarItem
              key={item}
              isActive={activeSidebar === item}
              itemName={item}
              onClickSideBarItem={onClickSideBarItem}
            />
          ))}
        </ul>
      </div>
      <div className="content">
        <div className="header">
          <div className="header_text_container">
            <h1>{activeSidebar}</h1>
            <p>This Channel is For Company wide chatter</p>
          </div>
          <div className="profile_container">
            <p style={{ marginRight: "10px" }}>{allChats.length}|100 </p>
            <CgProfile size={25} />
          </div>
        </div>
        <hr style={{ margin: "0" }} />
        <div className="chats_container">
          {allChats.map((item) => (
            <ChatItem key={item.msg} details={item} />
          ))}
        </div>
        <form onSubmit={onSubmitMsg} className="input_send_container">
          <input
            placeholder="Type a message..."
            onChange={onChangeInput}
            value={input}
            className="input"
          />
          <button style={{ marginRight: "10px" }} onClick={onClickEmojiButton}>
            <BsEmojiSmile />
          </button>
          {showEmojiInterface && (
            <div className="Emojis_container">
              <EmojiPicker onSelect={handleEmojiSelection} />
            </div>
          )}

          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default App;

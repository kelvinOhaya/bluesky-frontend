import chatRoomContext from "./chatRoomContext";
import { useState, useEffect } from "react";
import useAuth from "../auth/useAuth";
import useSocket from "../socket/useSocket";
import api from "../../utils/api";
import { useRef } from "react";

function ChatRoomProvider({ children }) {
  const { user, isLoading, accessToken, fetchUser } = useAuth();
  const { socket } = useSocket();
  const [isCreator, setIsCreator] = useState(null);
  const [chatRooms, setChatRooms] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const currentChat =
    chatRooms.find((room) => currentChatId === room._id) || null;
  const [messages, setMessages] = useState(null);
  const prevRoomId = useRef(); //seems to be for debugging purposes

  const activateChat = async (element) => {
    //store the old room value in prevRoomId
    prevRoomId.current = currentChatId;
    //set the currentChatId to the element that was clicked
    setMessages(null);
    setCurrentChatId(element._id);
    setIsCreator(user._id === element.creator);

    //save the current chat to mongoDB
    await api.put("/chatroom/update-current-room", {
      currentRoomId: element._id,
      socketId: socket.id,
    });
  };

  const loadChatRooms = async () => {
    try {
      const { data } = await api.get("/chatroom/send-info");

      data.chatRooms.map((chatRoom) => {
        if (chatRoom.isDm === true) {
          //  console.log(chatRoom);
        }
      });

      setChatRooms(data.chatRooms);
      setCurrentChatId(data.currentChat._id);
    } catch (error) {
      if (error.response && error.response.status == 401) {
        // console.log("Error trying to load the chat rooms: ", error);
      }
    }
  };

  const loadMessages = async () => {
    try {
      const { data } = await api.post("/chatroom/load-messages", {
        currentChatId: currentChat._id,
      });

      setMessages(data.messages);
    } catch (error) {
      //console.log("Error loading all the messages: ", error);
    }
  };

  useEffect(() => {
    if (!currentChat) return;
  }, [currentChat]);

  //join a room when a chat is selected
  useEffect(() => {
    if (!currentChat) return;
    //console.log(currentChat);
    socket.emit("join-room", {
      prevRoom: prevRoomId.current,
      newRoom: currentChat._id,
    });
  }, [currentChat]);

  //socket event listeners
  useEffect(() => {
    if (!socket) return;
    //utilities
    const handleReceiveMessage = (message) => {
      setMessages((prev) =>
        prev
          ? [...prev, { ...message, createdAt: Date.now() }]
          : [{ ...message, createdAt: Date.now() }]
      );
    };

    const updateCurrentChat = (foundChatRoom) => {
      console.log(
        `Here is the chatroom from the name change socket event: ${JSON.stringify(
          foundChatRoom
        )}`
      );
      setChatRooms((prev) =>
        prev.map((room) =>
          room._id === foundChatRoom._id
            ? {
                ...room,
                name: foundChatRoom.name,
                memberCount: foundChatRoom.memberCount,
              }
            : room
        )
      );
      setCurrentChatId(foundChatRoom._id);
    };

    const updateProfilePicture = async (foundUser) => {
      // console.log(
      //   "Event received with the following found user: \n",
      //   foundUser,
      //   "\n\nRequested from the user: \n",
      //   user
      // );
      if (foundUser._id === user._id) {
        await fetchUser(accessToken);
      }
      await Promise.all([loadMessages(), loadChatRooms()]);
    };

    const updateGroupProfilePicture = async (updatedChat) => {
      //console.log("SOCKET EVENT RECEIVED!");
      setChatRooms((prev) => {
        return prev.map((room) =>
          updatedChat._id === room._id ? updatedChat : room
        );
      });
      setCurrentChatId(updatedChat._id);
      //console.log("FINAL RESULTS:\n", currentChat);
    };

    const handlePrintSuccess = () => {
      //console.log("Socket Event received from express!!");
    };

    const handleIncreaseMemberCount = (data) => {
      //debug messages to check values
      //console.log(`Updated room ID: ${data.updatedRoomId}`);

      setChatRooms((prev) =>
        prev.map((room) =>
          room._id === data.updatedRoomId
            ? { ...room, memberCount: room.memberCount + 1 }
            : room
        )
      );
    };

    //backend data object: {roomId: id of the sender's currentChat}
    const handleDecreaseMemberCount = (data) => {
      const { roomId } = data;
      setChatRooms((prev) =>
        prev.map((room) =>
          room._id === roomId
            ? { ...room, memberCount: room.memberCount - 1 }
            : room
        )
      );
    };

    const handleAddRoom = (data) => {
      const { updatedRoom } = data;
      setChatRooms((prev) => [...prev, updatedRoom]);
    };

    //listeners
    socket.on("receive-message", handleReceiveMessage);
    socket.on("print-success", handlePrintSuccess);
    socket.on("update-room-name", updateCurrentChat);
    socket.on("receive-photo-update", updateProfilePicture);
    socket.on("receive-group-photo-update", updateGroupProfilePicture);
    socket.on("increase-member-count", handleIncreaseMemberCount);
    socket.on("add-room", handleAddRoom);
    socket.on("decrease-member-count", handleDecreaseMemberCount);

    return () => {
      socket.off("print-success", handlePrintSuccess);
      socket.off("receive-message", handleReceiveMessage);
      socket.off("update-room-name", updateCurrentChat);
      socket.off("receive-photo-update", updateProfilePicture);
      socket.off("receive-group-photo-update", updateGroupProfilePicture);
      socket.off("add-room", handleAddRoom);
      socket.off("increase-member-count", handleIncreaseMemberCount);
      socket.off("decrease-member-count", handleDecreaseMemberCount);
    };
  }, [socket, user, chatRooms, messages]);

  //initial load of all chatRooms and messages

  useEffect(() => {
    const getLoadedMessages = async () => {
      if (!currentChat) return;
      await loadMessages();
    };
    getLoadedMessages();
  }, [currentChat]);

  useEffect(() => {
    if (!currentChat) return;

    setIsCreator(user._id === currentChat.creator);
  }, [currentChat]);

  const verifyJoinCode = async (joinCode) => {
    try {
      const { data } = await api.post("/chatRoom/verify-join-code", {
        joinCode,
      });
      return data.isValid;
    } catch (error) {
      //console.log("Error trying to verify join codes: ", error);
    }
  };
  const checkIfRoomExists = (joinCode) => {
    const roomExists = chatRooms.find((room) => room.joinCode === joinCode);
    return roomExists ? true : false;
  };

  const checkIfDmExists = (joinCode) => {
    const dmExists = chatRooms.find(
      (room) => room.otherUser?.joinCode === joinCode && room.isDm === true
    );
    return dmExists ? true : false;
  };

  //for joining group chats in general
  const joinRoom = async (joinCode) => {
    try {
      /*
        Send a post request with the following join code
        Expected data object: {newRoom: the new chat room}
      */
      const { data } = await api.post("/chatRoom/join", { joinCode });
      //console.log(`Here is your new room: \n${data.newRoom}`);
      setChatRooms((prev) => (prev ? [...prev, data.newRoom] : [data.newRoom]));
    } catch (error) {
      //console.log("Error trying to verify join codes: ", error);
    }
  };

  const createGroup = async (groupName) => {
    const { data } = await api.post("/chatroom/", {
      senderId: user._id,
      name: groupName,
    });
    if (chatRooms != null) {
      setChatRooms([...chatRooms, data.newRoom]);
    } else {
      setChatRooms([data.newRoom]);
    }
    setCurrentChatId(data.newRoom._id);
  };

  //send a delete request to "chatroom/leave-room"
  const leaveChatRoom = async () => {
    if (!currentChatId) return;
    try {
      await api.delete("/chatroom/leave-room", {
        data: { currentRoomId: currentChatId },
      });
      //send an event to leave the current socket room
      socket.emit("leave-room", { currentRoomId: currentChatId });
      //filter out the old chat room
      setChatRooms((prev) => prev.filter((room) => room._id != currentChatId));
      //set currentChat and messages to null
      setCurrentChatId(null);
      setMessages(null);
    } catch (error) {
      //console.log("Error leaving chat room: ", error);
    }
  };

  const sendMessage = (chatRoomId, content) => {
    socket.emit("send-message", {
      chatRoomId,
      content,
      sender: user,
    });
  };

  const changeName = async (newName) => {
    //send put request to update name in mongoose
    try {
      const { data } = await api.put("/chatroom/change-name", {
        newName: newName,
        currentRoomId: currentChat._id,
      });

      //if all went well, emit a socket event to update EVERYONE's frontend
      socket.emit("change-room-name", data.foundChatRoom);

      //if all went well, update the frontend accordingly
    } catch (error) {
      //console.log("Error trying to update the names: ", error);
    }
  };

  /*
  make an api call to the "/chatroom/find-user"
  */
  const findUser = async (joinCode) => {
    const { data } = await api.post("/chatroom/find-user", {
      joinCode,
      socketId: socket.id,
    });
    //log the new room for proof the new room got to the client
    // console.log("NEW ROOM: \n", data.newRoom);
    setChatRooms((prev) => [...prev, data.newRoom]);
  };

  return (
    <chatRoomContext.Provider
      value={{
        chatRooms,
        setChatRooms,
        messages,
        setMessages,
        currentChat,
        currentChatId,
        setCurrentChatId,
        isCreator,
        setIsCreator,
        createGroup,
        verifyJoinCode,
        joinRoom,
        checkIfRoomExists,
        checkIfDmExists,
        activateChat,
        leaveChatRoom,
        findUser,
        loadChatRooms,
        sendMessage,
        changeName,
      }}
    >
      {children}
    </chatRoomContext.Provider>
  );
}

export default ChatRoomProvider;

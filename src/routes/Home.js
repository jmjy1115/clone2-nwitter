import { dbService } from "fbase";
import { useEffect, useState } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";

export const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);

  // 데이터 받아오기
  const getNweets = async () => {
    const dbNweets = await getDocs(collection(dbService, "nweets"));
    const newNweets = dbNweets.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setNweets(newNweets);
  };

  // 컴포넌트 마운트 후 트윗 가져오기
  useEffect(() => {
    getNweets();
  }, []);

  // 제출 시 DB에 트윗 추가
  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const docRef = await addDoc(collection(dbService, "nweets"), {
        text: nweet,
        createdAt: Date.now(),
        creatId: userObj.uid,
      });
    } catch (error) {
      console.error(error);
    }
    setNweet("");
  };

  const onChange = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          value={nweet} 
          onChange={onChange} 
          type="text" 
          placeholder="What's on your mind?" 
          maxLength={120}
        />
        <input type="submit" value="Nweet" />
      </form>
      <div>
        {nweets.map((nweet) => (
          <div key={nweet.id}>
            <h4>{nweet.text}</h4>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
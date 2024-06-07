// App.js
import React, { useEffect, useState, useRef } from 'react';
import './video.css';
import VideoCard from '../components/VideoCard';
import BottomNavbar from '../components/BottomNavbar';
import TopNavbar from '../components/TopNavbar';



const videoUrls = [
  {
    id: '1',
    url: require('../videos/video1.mp4'),
    profilePic: 'https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-giso/9d429ac49d6d18de6ebd2a3fb1f39269~c5_100x100.jpeg?x-expires=1688479200&x-signature=pjH5pwSS8Sg1dJqbB1GdCLXH6ew%3D',
    username: 'csjackie',
    description: 'Lol nvm #compsci #chatgpt #ai #openai #techtok',
    song: 'Original sound - Famed Flames',
    likes: 430,
    comments: 13,
    commentList: [
      { user: 'user1', text: 'Great video!' },
      { user: 'user2', text: 'Loved it!' }
    ]
  },
  {
    id: '2',
    url: require('../videos/video2.mp4'),
    profilePic: 'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/eace3ee69abac57c39178451800db9d5~c5_100x100.jpeg?x-expires=1688479200&x-signature=wAkVmwL7lej15%2B16ypSWQOqTP8s%3D',
    username: 'dailydotdev',
    description: 'Every developer brain @francesco.ciulla #developerjokes #programming #programminghumor #programmingmemes',
    song: 'tarawarolin wants you to know this isnt my sound - Chaplain J Rob',
    likes: '13.4K',
    comments: 3121,
    commentList: [
      { user: 'user3', text: 'So true!' },
      { user: 'user4', text: 'Hilarious!' }
    ]
  },
  {
    id: '3',
    url: require('../videos/video3.mp4'),
    profilePic: 'https://p77-sign-va.tiktokcdn.com/tos-maliva-avt-0068/4e6698b235eadcd5d989a665704daf68~c5_100x100.jpeg?x-expires=1688479200&x-signature=wkwHDKfNuIDqIVHNm29%2FRf40R3w%3D',
    username: 'wojciechtrefon',
    description: '#programming #softwareengineer #vscode #programmerhumor #programmingmemes',
    song: 'help so many people are using my sound - Ezra',
    likes: 5438,
    comments: 238,
    commentList: [
      { user: 'user5', text: 'Nice!' },
      { user: 'user6', text: 'Interesting!' }
    ]
  },
  {
    id: '4',
    url: require('../videos/video4.mp4'),
    profilePic: 'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/4bda52cf3ad31c728153859262c329db~c5_100x100.jpeg?x-expires=1688486400&x-signature=ssUbbCpZFJj6uj33D%2BgtcqxMvgQ%3D',
    username: 'faruktutkus',
    description: 'Wait for the end | Im RTX 4090 TI | #softwareengineer #softwareengineer #coding #codinglife #codingmemes ',
    song: 'orijinal ses - Computer Science',
    likes: 9689,
    comments: 230,
    commentList: [
      { user: 'user7', text: 'Wow!' },
      { user: 'user8', text: 'Amazing!' }
    ]
  }
];

function App() {
  const [videos, setVideos] = useState([]);
  const videoRefs = useRef([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(null);

  useEffect(() => {
    setVideos(videoUrls);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.8, // Adjust this value to change the scroll trigger point
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        const videoElement = entry.target;
        if (entry.isIntersecting) {
          videoElement.play();
          setCurrentVideoIndex(videoRefs.current.indexOf(videoElement));
        } else {
          videoElement.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    videoRefs.current.forEach((videoRef) => {
      observer.observe(videoRef);
    });

    return () => {
      observer.disconnect();
    };
  }, [videos]);

  const handleVideoRef = (index) => (ref) => {
    videoRefs.current[index] = ref;

    // Function to add new comment to a video
    const addComment = (comment) => {
      setVideos((prevVideos) => {
        const updatedVideos = [...prevVideos];
        updatedVideos[index].commentList.push(comment); // Add comment to the corresponding video
        return updatedVideos;
      });
    };

    // Return the function to add comment
    return addComment;
  };

  return (
    <div className="app">
      <div className="container">
        <TopNavbar className="top-navbar" />
        {videos.map((video, index) => (
          <VideoCard
            key={index}
            id={video.id}
            username={video.username}
            description={video.description}
            song={video.song}
            likes={video.likes}
            comments={video.comments}
            url={video.url}
            profilePic={video.profilePic}
            commentList={video.commentList}
            setVideoRef={handleVideoRef(index)}
            autoplay={index === 0}
            isCurrentVideo={index === currentVideoIndex}
          />
        ))}
        <BottomNavbar className="bottom-navbar" />
      </div>
    </div>
  );
}

export default App;

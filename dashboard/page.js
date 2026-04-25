'use client';
import { useState } from 'react';

export default function Dashboard() {
  const [videoId, setVideoId] = useState("jfKfPfyJRdk");
  const [input, setInput] = useState("");

  const boutons = [
    { nom: "🔴 Pasteur Chris Live", lien: "jfKfPfyJRdk" },
    { nom: "💧 Coulée de Guérison", lien: "jfKfPfyJRdk" },
    { nom: "🇹🇩 Télé Tchad", lien: "A1yfJ5h0_Zk" },
    { nom: "🇹🇩 Radio Tchad", lien: "jfKfPfyJRdk" },
    { nom: "📺 TV Internationales", lien: "jfKfPfyJRdk" },
    { nom: "📻 Radios Internationales", lien: "jfKfPfyJRdk" },
    { nom: "🎤 LoveWorld Singers", lien: "jfKfPfyJRdk" },
    { nom: "🎵 Gospel 5G", lien: "jfKfPfyJRdk" },
    { nom: "📚 Enseignements Chris", lien: "jfKfPfyJRdk" },
    { nom: "😂 Parlement du Rire", lien: "jfKfPfyJRdk" },
    { nom: "🙏 Louanges 24/7", lien: "jfKfPfyJRdk" },
  ];

  const jouerVideo = () => {
    if (input.includes("youtube.com") || input.includes("youtu.be")) {
      const id = input.split("v=")[1]?.split("&")[0] || input.split("/").pop();
      setVideoId(id);
    } else if (input.length === 11) {
      setVideoId(input);
    }
  };

  return (
    <div style={{minHeight:'100vh', background:'black', color:'white', padding:'20px'}}>
      <h1 style={{color:'gold', textAlign:'center', fontSize:'28px'}}>GLOIRE-HUB TV 📺🔍 🇹🇩</h1>
      <div style={{display:'flex', gap:'10px',

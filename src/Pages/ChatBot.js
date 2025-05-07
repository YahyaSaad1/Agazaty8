import React, { useEffect, useState } from 'react';
import responses from './responses';
import axios from 'axios';

const ChatBot = () => {
    const [messages, setMessages] = useState([
        { from: 'bot', text: "مرحبًا! كيف يمكنني مساعدتك؟" },
    ]);
    const [input, setInput] = useState('');
    const [responses, setResponses] = useState({});

    // تحميل البيانات من ملف responses.json
    useEffect(() => {
        // تأكد من أن ملف responses.json في المسار الصحيح داخل مجلد public
        axios.get('/responses.json')
            .then((response) => {
                setResponses(response.data);
            })
            .catch((error) => {
                console.error("Error loading responses.json:", error);
            });
    }, []);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage = { text: input, from: 'user' };
        const normalizedInput = input.trim().toLowerCase(); // تحويل النص لأحرف صغيرة لتوحيد البحث

        // التحقق من وجود كلمات مفتاحية في النص المدخل
        let botReply = 'معذرة، لم أتعرف على هذا النوع من الإجازات. حاول تكتب الاسم بدقة 🙏';

        // البحث عن الكلمات المفتاحية داخل النص
        for (const keyword in responses) {
            if (normalizedInput.includes(keyword)) {
                botReply = responses[keyword]; // الرد بناءً على الكلمة المفتاحية
                break;
            }
        }

        const botMessage = { text: botReply, from: 'bot' };

        setMessages(prev => [...prev, userMessage, botMessage]);
        setInput('');
    };


    return (
        <div style={styles.chatContainer}>
        <div style={styles.messagesBox}>
            {messages.map((msg, index) => (
            <div
                key={index}
                style={{
                ...styles.message,
                alignSelf: msg.from === 'user' ? 'flex-end' : 'flex-start',
                backgroundColor: msg.from === 'user' ? '#d1e7dd' : '#f8d7da',
                }}
            >
                {msg.text}
            </div>
            ))}
        </div>
        <div style={styles.inputArea}>
            <input
            style={styles.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="اكتب نوع الاجازة..."
            />
            <button onClick={handleSend} style={styles.button}>إرسال</button>
        </div>
        </div>
    );
};

const styles = {
  chatContainer: {
    width: '100%',
    maxWidth: '600px',
    margin: '40px auto',
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontFamily: 'sans-serif',
  },
  messagesBox: {
    padding: '20px',
    height: '400px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    backgroundColor: '#fff',
  },
  message: {
    padding: '10px',
    borderRadius: '10px',
    maxWidth: '70%',
  },
  inputArea: {
    display: 'flex',
    padding: '10px',
    borderTop: '1px solid #ddd',
  },
  input: {
    flexGrow: 1,
    padding: '10px',
    fontSize: '16px',
  },
  button: {
    marginLeft: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default ChatBot;

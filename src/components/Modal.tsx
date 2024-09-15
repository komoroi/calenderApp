"use client";

import React, { useState } from 'react';
import './Modal.css';

interface ModalProps {
  onClose: () => void;
  onSave: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose, onSave }) => {
  const [text, setText] = useState('');
  const [hour, setHour] = useState('00');
  const [minute, setMinute] = useState('00');
  const [repeat, setRepeat] = useState('none');
  const [color, setColor] = useState('#ff0000');

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">予定を追加</div>
        <div className="form-group">
          <label htmlFor="eventText">内容:</label>
          <input
            type="text"
            id="eventText"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="eventTime">時間:</label>
          <div className="time-container">
            <select id="eventHour" value={hour} onChange={(e) => setHour(e.target.value)}>
              {[...Array(24).keys()].map(i => (
                <option key={i} value={i < 10 ? `0${i}` : i}>{i < 10 ? `0${i}` : i}</option>
              ))}
            </select>
            <select id="eventMinute" value={minute} onChange={(e) => setMinute(e.target.value)}>
              {[...Array(12).keys()].map(i => (
                <option key={i * 5} value={i * 5 < 10 ? `0${i * 5}` : i * 5}>{i * 5 < 10 ? `0${i * 5}` : i * 5}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="eventRepeat">繰り返し:</label>
          <select id="eventRepeat" value={repeat} onChange={(e) => setRepeat(e.target.value)}>
            <option value="none">なし</option>
            <option value="1week">1週間ごと</option>
            <option value="2weeks">2週間ごと</option>
            <option value="3weeks">3週間ごと</option>
            <option value="4weeks">4週間ごと</option>
          </select>
        </div>
        <div className="form-group">
          <label>色:</label>
          <div className="color-picker">
            {['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'].map(colorOption => (
              <div
                key={colorOption}
                className="color-option"
                style={{ backgroundColor: colorOption }}
                onClick={() => setColor(colorOption)}
              ></div>
            ))}
          </div>
          <input type="hidden" id="eventColor" value={color} />
        </div>
        <div className="modal-footer">
          <button onClick={onClose} className="cancel">キャンセル</button>
          <button onClick={() => { onSave(); onClose(); }}>保存</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

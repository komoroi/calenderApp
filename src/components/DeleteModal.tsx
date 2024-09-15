import React from 'react';

interface DeleteModalProps {
  onClose: () => void;
  onDelete: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ onClose, onDelete }) => {
  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">予定を削除</div>
        <div className="modal-body">
          <p>この予定を削除してもよろしいですか？</p>
        </div>
        <div className="modal-footer">
          <button onClick={onClose}>キャンセル</button>
          <button onClick={onDelete}>削除</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;

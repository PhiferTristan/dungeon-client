import Modal from "react-modal";
import PropTypes from "prop-types";
import { ModalCharacterList } from "./ModalCharacterList";

Modal.setAppElement("#root");

export const CharacterModal = ({
  isOpen,
  onClose,
  token,
  playerId,
  onSelectCharacter,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Character List Modal"
    >
      <h2>Your Characters</h2>
      <ModalCharacterList
        token={token}
        playerId={playerId}
        onSelectCharacter={onSelectCharacter}
      />
      <button onClick={onClose}>Close</button>
    </Modal>
  );
};

CharacterModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  token: PropTypes.string,
  playerId: PropTypes.string,
  onSelectCharacter: PropTypes.func,
};

import { createPortal } from 'react-dom';
import './BottomSheet.css';

function BottomSheet({ children, show }) {
  const bottomSheetElement = document.getElementById('bottom-sheet');

  return createPortal(
    <div className={`bottom-sheet-container ${show ? 'open' : 'close'}`}>{children}</div>,
    bottomSheetElement,
  );
}
export default BottomSheet;

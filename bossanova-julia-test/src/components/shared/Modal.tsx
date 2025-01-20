import { tv } from 'tailwind-variants';
import * as Icons from '@remixicon/react';
import Icon from '../UI/Icon';
import { ModalButtonVariants } from '../../constants/Enum/ModalButtonVariants';
import { SizeVariant } from '../../constants/Enum/SizeVariant';

export interface ModalProps {
  buttonType: ModalButtonVariants;
  size: SizeVariant;
  modalTitle: string;
  modalIcon?: boolean;
  closeIcon?: boolean;
  onClose?: () => void;
  modalSubtitle?: string;
  buttonLabelOne?: string;
  buttonLabelTwo?: string;
  children?: React.ReactNode;
  disableButtonOne?: boolean;
  disableButtonTwo?: boolean;
  onClickButtonOne?: () => void;
  onClickButtonTwo?: () => void;
}

export interface ModalHeaderProps {
  title: string;
  subtitle?: string;
  closeIcon?: boolean;
  onClose?: () => void;
}

export interface ModalFooterProps {
  buttonType: ModalButtonVariants;
  buttonTextOne?: string;
  buttonTextTwo?: string;
  disableButtonOne?: boolean;
  disableButtonTwo?: boolean;
  onClickButtonOne?: () => void;
  onClickButtonTwo?: () => void;
}

const stylesHeader = tv({
  slots: {
    headerContainerStyle:
      'rounded-t-xl flex row w-full p-5 bg-greyScale-white align-top justify-between',
    tilerHeaderStyle: 'flex flex-col justify-center gap-2',
    buttonStyle:
      'flex justify-center py-3 px-4 rounded-sm gap-2 text-branding-primary bg-greyScale-white hover:bg-primaryScale-clear active:bg-primaryScale-light',
  },
});

const { buttonStyle, headerContainerStyle, tilerHeaderStyle } = stylesHeader();

const ModalHeader: React.FC<ModalHeaderProps> = ({ title, onClose, subtitle, closeIcon }) => {
  return (
    <div className={headerContainerStyle()}>
      <div className={tilerHeaderStyle()}>
        <h2> {title} </h2>

        {subtitle && subtitle.length && <h3>{subtitle}</h3>}
      </div>

      {closeIcon && (
        <button onClick={onClose}>
          <Icon size={'16'} iconName={'RiCloseFill'} />
        </button>
      )}
    </div>
  );
};

const footerClass = tv({
  base: 'p-5 bg-greyScale-white rounded-b-xl border-t border-t-greyScale-clear',
  variants: {
    variant: {
      one: 'flex flex-row justify-center',
      two: 'flex flex-row justify-end',
      'two-center': 'flex flex-row justify-center',
      none: 'border-none pb-0',
    },
  },
});

const footerButtons = tv({
  slots: {
    buttonFooterStyle: 'flex flex-row gap-[200px] justify-center mb-5',
  },
});

const { buttonFooterStyle } = footerButtons();

const ModalFooter: React.FC<ModalFooterProps> = ({
  buttonTextOne,
  buttonTextTwo,
  disableButtonOne,
  disableButtonTwo,
  onClickButtonOne,
  onClickButtonTwo,
}) => {
  return (
    <div className={footerClass()}>
      <div className={buttonFooterStyle()}>
        <button className={buttonStyle()} onClick={onClickButtonOne} disabled={disableButtonOne}>
          {buttonTextOne}
        </button>
        <button className={buttonStyle()} onClick={onClickButtonTwo} disabled={disableButtonTwo}>
          {buttonTextTwo}
        </button>
      </div>
    </div>
  );
};

const modalSizeClass = tv({
  base: 'rounded-xl shadow-xl h-fit',
  variants: {
    size: {
      [SizeVariant.SMALL]: 'w-[500px]',
      [SizeVariant.MEDIUM]: 'w-[700px]',
      [SizeVariant.LARGE]: 'w-[750px]',
    },
  },
});

const Modal: React.FC<ModalProps> = ({
  size,
  onClose,
  children,
  closeIcon,
  modalTitle,
  buttonType,
  modalSubtitle,
  buttonLabelOne,
  buttonLabelTwo,
  disableButtonOne,
  disableButtonTwo,
  onClickButtonOne,
  onClickButtonTwo,
}) => {
  return (
    <div className={modalSizeClass({ size })}>
      <ModalHeader
        onClose={onClose}
        title={modalTitle}
        closeIcon={closeIcon}
        subtitle={modalSubtitle}
      />

      {children}

      <ModalFooter
        buttonType={buttonType}
        buttonTextOne={buttonLabelOne}
        buttonTextTwo={buttonLabelTwo}
        disableButtonOne={disableButtonOne}
        disableButtonTwo={disableButtonTwo}
        onClickButtonOne={onClickButtonOne}
        onClickButtonTwo={onClickButtonTwo}
      />
    </div>
  );
};

export default Modal;

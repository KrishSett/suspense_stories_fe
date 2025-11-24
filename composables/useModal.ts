interface ModalState {
    isOpen: boolean;
    title: string;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
}

export const useModal = () => {
    const modal = reactive<ModalState>({
        isOpen: false,
        title: '',
        message: '',
        type: 'info',
    });

    const showModal = (
        title: string, 
        message: string, 
        type: 'success' | 'error' | 'warning' | 'info' = 'info'
    ): void => {
        modal.title = title;
        modal.message = message;
        modal.type = type;
        modal.isOpen = true;
    };

    const closeModal = (): void => {
        modal.isOpen = false;
        // Optional: Reset after animation
        setTimeout(() => {
        modal.title = '';
        modal.message = '';
        modal.type = 'info';
        }, 300);
    };

    const showSuccess = (title: string, message: string): void => {
        showModal(title, message, 'success');
    };

    const showError = (title: string, message: string): void => {
        showModal(title, message, 'error');
    };

    const showWarning = (title: string, message: string): void => {
        showModal(title, message, 'warning');
    };

    const showInfo = (title: string, message: string): void => {
        showModal(title, message, 'info');
    };

    return {
        modal,
        showModal,
        closeModal,
        showSuccess,
        showError,
        showWarning,
        showInfo,
    };
};
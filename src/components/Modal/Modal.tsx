import {Box, Button, Modal, Typography} from "@mui/material";

interface ModalProps {
    header: string,
    body?: string,
    openModal: boolean,
    buttonText: string,

    action(): void,

    handleClose(): void
}

const ModalComponent = (props: ModalProps) => {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    return (<Modal
        open={props.openModal}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                {props.header}
            </Typography>
            <Typography id="modal-modal-description" sx={{mt: 2}}>
                {props.body}
            </Typography>
            <Typography component={"div"} sx={{mt: 2}}>
                <Button variant={"outlined"} onClick={props.action}>{props.buttonText}</Button>
            </Typography>
        </Box>
    </Modal>)
}

export default ModalComponent
import React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

function HapusMapelAlert({ deleteHandler, openAlert, cancelRef, onClose }) {
  return (
    <AlertDialog
      isOpen={openAlert}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Hapus Data Mapel
          </AlertDialogHeader>

          <AlertDialogBody>
            Apakah anda yakin? Data Mapel yang dihapus tidak bisa dikembalikan.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Batal
            </Button>
            <Button colorScheme="red" ml={3} onClick={deleteHandler}>
              Hapus
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

export default HapusMapelAlert;

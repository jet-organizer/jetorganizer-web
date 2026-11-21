"use client";

import { Button, Card, Link, Modal } from "@heroui/react";

export function HeroUIDemo() {
  return (
    <Card className="mt-8 gap-5 border border-border p-6 sm:p-8">
      <Card.Header className="gap-2">
        <Card.Title>Prueba de interacción</Card.Title>
        <Card.Description>
          Abre el diálogo y ciérralo con el botón o con la tecla Escape.
        </Card.Description>
      </Card.Header>
      <Card.Footer className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <Modal>
          <Button>Abrir diálogo</Button>
          <Modal.Backdrop>
            <Modal.Container placement="center" size="sm">
              <Modal.Dialog>
                <Modal.Header>
                  <Modal.Heading>HeroUI está funcionando</Modal.Heading>
                </Modal.Header>
                <Modal.Body>
                  <p>El botón abrió correctamente el diálogo de HeroUI.</p>
                </Modal.Body>
                <Modal.Footer>
                  <Button slot="close">Cerrar diálogo</Button>
                </Modal.Footer>
              </Modal.Dialog>
            </Modal.Container>
          </Modal.Backdrop>
        </Modal>
        <Link href="https://heroui.com/docs/react/getting-started/quick-start">
          Guía de HeroUI
        </Link>
      </Card.Footer>
    </Card>
  );
}

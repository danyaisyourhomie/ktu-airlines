import React from 'react';
import { useHistory } from 'react-router';
import { Alert, Button, Card, Center, Checkbox, Container, Space, Stack, Title } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useAppStore } from 'store';
import { z } from 'zod';

import { ROOMS } from 'domain/room';

import { Room } from 'shared/ui';
import { HeaderBar } from 'shared/ui/HeaderBar';
import { TicketOperator } from 'shared/ui/Ticket/TicketOperator';
import { TicketRoute } from 'shared/ui/Ticket/TicketRoute';

import styles from './CheckPage.module.scss';

const schema = z.object({
  prepayment: z.boolean().refine((v) => v === true, { message: ' ' }),
});

export const CheckPage = () => {
  const { selectedRoom,
    vkPermissions,
    checkPermissions,
    vkPermissionsLoading,
    signIn,
  } = useAppStore();

  const history = useHistory();

  const form = useForm({
    initialValues: {
      prepayment: false,
      bedSheets: false,
    },
    validate: zodResolver(schema),
  });

  const currentRoom = ROOMS.find(r => r.name === selectedRoom?.roomName);

  const hasBedSheets = selectedRoom?.services.includes('bed_sheets');
  const isVegan = selectedRoom?.services.includes('vegan_menu');

  const hasVkErrors = !vkPermissions?.canReceiveMessages
    || !vkPermissions.isMember;

  const submit = async () => {
    const { hasErrors } = form.validate();

    if (hasErrors) {
      return;
    }

    await signIn();
    history.push('/booked');

  };

  return (
    <div className={styles.page}>
      <Container>
        <HeaderBar />
        <Center>
          <div className={styles.check}
            breakpoints={[
              { maxWidth: '62rem', cols: 1, spacing: 'md' },
            ]}
          >
            <Stack className={styles.ticketInfo}>
              <Title className={styles.title}>
              Детали<br />бронирования
              </Title>
              <Card padding={'xl'} radius="lg">
                <Stack spacing={'xl'}>
                  <TicketOperator name="[ktu].pobeda" />
                  <TicketRoute date="5 мая" endTime="10:00" startTime="7:30" />
                  <TicketRoute date="6 мая" endTime="10:30" startTime="12:10" />
                </Stack>
              </Card>
              {currentRoom && <Room room={currentRoom} minified />}
            </Stack>
            <Card padding={'xl'} radius="lg">
              <Stack className={styles.paymentInfo} >
                <div cols={2} className={styles.payment}>
                  <Stack className={styles.services}>
                    <Title order={3}>Услуга</Title>
                    <Title order={6}>Авиабилеты</Title>
                    <Title order={6}>Номер в KTU Resort Hotel</Title>
                    <Title order={6}>Вегетерианский обед и ужин</Title>
                    <Title order={6}>Постельное бельё</Title>
                    <Space h={'lg'} />
                    <Title order={2}>Итого</Title>
                  </Stack>
                  <Stack className={styles.count}>
                    <Title order={3}>Кол-во</Title>
                    <Title order={6}>1</Title>
                    <Title order={6}>1</Title>
                    <Title order={6}>{isVegan ? 1 : 0}</Title>
                    <Title order={6}>{hasBedSheets ? 1 : 0}</Title>
                    <Space h={'lg'} />
                    <Title order={2}>350 руб.</Title>
                  </Stack>
                </div>
                <Stack spacing={'sm'}>
                  <Checkbox
                    {...form.getInputProps('prepayment')}
                    label={
                      <>Оплачу возвратный залог –
                        <b>1000 руб. наличными</b></>
                    }
                    size={'xs'}
                    radius={'sm'}
                    color={form.values.prepayment ? 'lime' : 'red'}
                  />
                  {hasBedSheets &&
                    <Checkbox
                      {...form.getInputProps('bedSheets')}
                      checked={hasBedSheets}
                      disabled
                      label={
                        <>Оплачу постельное белье – <b>300 руб. наличными</b></>
                      }
                      size={'xs'} radius={'sm'}
                      color="lime"
                    />}
                </Stack>
                <Stack className={styles.confirmBtn}>
                  {!vkPermissions?.isMember && <Alert title="Внимание!" color={'red'} radius="md">
                    Вы не подписаны на группу <a href="https://vk.com/ktu.crew" target={'_blank'} rel="noreferrer">Актив КТУ</a>
                  </Alert>}
                  {!vkPermissions?.canReceiveMessages && <Alert title="Внимание!" color={'red'} radius="md">
                    Разрешите сообщения от группы <a href="https://vk.com/ktu.crew" target={'_blank'} rel="noreferrer">Актив КТУ</a>,
                    без этого вы не сможете подтвердить регистрацию!
                  </Alert>}
                  {hasVkErrors && <Button
                    onClick={checkPermissions}
                    loading={vkPermissionsLoading}
                  >
                    Проверить еще раз
                  </Button>}
                  <Button
                    className={styles.bookBtn}
                    onClick={submit}
                    disabled={!form.values.prepayment}>
                  Забронировать путевку
                  </Button>
                </Stack>
              </Stack>
            </Card>
          </div>
        </Center>
      </Container>
    </div>
  );
};
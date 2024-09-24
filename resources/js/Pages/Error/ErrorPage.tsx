import { Text, Container, Title, Group, Button, Flex, Stack } from '@mantine/core';
import classes from './Error.module.css';
import { codeErrors } from './values';

const NotFound = ({ code }:any) => {

  const error = codeErrors.find(e => Number(e.code) === code); 

  const frontEndError = (code: number) => {
    return code.toString().startsWith('4');
  }


  return (
    <div className={classes.root} style={{backgroundImage : "url('/bg-admin.jpg')"}}>
        <Stack justify={'center'} align={'center'} h={'100%'}>
          <div className={classes.label}>{code}</div>
          {error ? (
            <>
              <Title className={classes.title}>{error.title}</Title>
              <Text size="lg" ta="center" className={classes.description}>{error.desc}</Text>
              <Group justify="center">
                {frontEndError(Number(error.code)) ? 
                  <Group gap={'xs'}>
                    <Button variant="filled" color="gray" size="md" onClick={() => window.history.back()}>Go Back</Button>
                    <Button variant="filled" color="green" size="md" onClick={() => window.location.href = '/admin'}>Go to Home</Button>
                  </Group>
                  :
                  <Button variant="filled" color="green" size="md" onClick={() => window.location.reload()}>Refresh the page</Button>
                }
              </Group>
            </>
          ) : (
            <>
              <Title className={classes.title}>{code}</Title>
              <Text size="lg" ta="center" className={classes.description}>Sorry, an unknown error occurred. Please contact support.</Text>
              <Group justify="center">
                <Button variant="filled" color="green" size="md" onClick={() => window.location.reload()}>Refresh the page</Button>
              </Group>
            </>
          )}          
        </Stack>
    </div>
  );
};

export default NotFound;


import { Box, Flex, TextInput, PasswordInput, Button, Stack, Title, Text, Center, Image, Divider, SimpleGrid } from '@mantine/core';
import { useState } from 'react';
import theme from '../../utils/theme'; 
import blackLogo from '../../assets/libroflow_black_without_text.png'; 
import whiteLogo from '../../assets/libroflow_white_with_text.png'; 
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { getPageVariants, pageTransition } from '../../animations/authPageTransitions';
import classes from './LoginPage.module.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Handle login logic
  };

  const handleRoleLogin = (role: string) => {
    if (role === 'admin') {
      navigate('/admin');
    } else if (role === 'department-manager') {
      navigate('/department-manager');
    } else if (role === 'finance-manager') {
      navigate('/finance-manager');
    } else if (role === 'supplier') {
      navigate('/supplier');
    } else if (role === 'user') {
      navigate('/user');
    }
  };

  const variants = getPageVariants("right");
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      transition={pageTransition}
      style={{ backgroundColor: '#ffffff' }}
    >
    <Flex
      direction={{ base: 'column', md: 'row' }}
      className={classes.container}
    >
      {/* Left Side - White */}
      <Box
        w={{ base: '100%', md: '50%'  }}
        h="100%"
        className={classes.whiteBox}
      >
        <Flex
          direction="column"
          align="center"
          justify="center"
          className={classes.whiteBoxContent}
        >
          <Box w="100%" maw={400}>
            <Center h="20vh">
              <Image src={blackLogo} alt="LibroFlow Logo" w="200px" />
            </Center>
            <Flex direction="column" align="center">
              <Title order={1} mb="md" c={theme.colors.darkBlue}>
                Welcome back 👋
              </Title>

              <Text size="sm" c="dimmed" mb="lg">
                Please enter your credentials to log in
              </Text>
            </Flex>

            <form onSubmit={handleSubmit}>
              <Stack>
                <TextInput
                  label="Email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                  required
                />
                <PasswordInput
                  label="Password"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                  required
                />

                <Flex justify="end">
                  <Text
                    component="button"
                    type="button"
                    className={classes.forgotPasswordButton}
                    onClick={() => navigate('/forgot-password')}
                  >
                    Forgot password?
                  </Text>
                </Flex>

                <Button
                  type="submit"
                  fullWidth
                  color={theme.colors.darkBlueLighter}
                  radius="md"
                  size="md"
                  className={classes.loginButton}
                >
                  Login
                </Button>

                <Divider label="For Development Purposes Only" labelPosition="center" my="md" />

                <Text ta="center" mb="-10px" mt="-10px" fw={500}>Login as:</Text>

                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xs">
                  <Button
                    variant="filled"
                    size="sm"
                    styles={{
                      root: {
                        backgroundColor: '#FCEFCB',
                        color: '#4E1F00',
                        '&:hover': { backgroundColor: '#F7E6B7' }
                      }
                    }}
                    onClick={() => handleRoleLogin('admin')}
                    className={classes.loginButton}
                  >
                    Admin
                  </Button>

                  <Button
                    variant="filled"
                    size="sm"
                    styles={{
                      root: {
                        backgroundColor: '#FAD59A',
                        color: '#4E1F00',
                        '&:hover': { backgroundColor: '#F5CC86' }
                      }
                    }}
                    onClick={() => handleRoleLogin('department-manager')}
                    className={classes.loginButton}
                  >
                    Department Manager
                  </Button>

                  <Button
                    variant="filled"
                    size="sm"
                    styles={{
                      root: {
                        backgroundColor: '#E9A319',
                        color: '#4E1F00',
                        '&:hover': { backgroundColor: '#D99510' }
                      }
                    }}
                    onClick={() => handleRoleLogin('finance-manager')}
                    className={classes.loginButton}
                  >
                    Finance Manager
                  </Button>

                  <Button
                    variant="filled"
                    size="sm"
                    styles={{
                      root: {
                        backgroundColor: '#A86523',
                        color: '#FCEFCB',
                        '&:hover': { backgroundColor: '#975A1F' }
                      }
                    }}
                    onClick={() => handleRoleLogin('supplier')}
                    className={classes.loginButton}
                  >
                    Supplier
                  </Button>

                  <Button
                    variant="filled"
                    size="sm"
                    styles={{
                      root: {
                        backgroundColor: '#4E1F00',
                        color: '#FCEFCB',
                        '&:hover': { backgroundColor: '#5F2600' }
                      }
                    }}
                    onClick={() => handleRoleLogin('user')}
                    className={classes.loginButton}
                    style={{ gridColumn: '1 / -1' }}
                  >
                    User
                  </Button>
                </SimpleGrid>
              </Stack>
            </form>
          </Box>
        </Flex>
      </Box>

      {/* Right Side - Dark */}
      <Box
        w={{ base: '100%', md: '50%' }}
        h="100%"
        className={classes.darkBlueBox}
      >
        <Flex
          direction="column"
          align="center"
          justify="center"
          className={classes.darkBlueBoxContent}
        >
          <Image src={whiteLogo} alt="LibroFlow Logo" w="500px" />
          
          <Text size="46px" mb="50px" ta="center">
            "Streamline Your Bookstore <br /> & Library Operations with Ease."
          </Text>

          <Text size="lg" mb="sm" ta="center">
            New to our platform?
          </Text>

          <Button
            w={{ base: '100%', md: '50%' }}
            color={theme.colors.blueishGrey}
            radius="md"
            size="md"
            className={classes.signUpButton}
            onClick={() => navigate('/register')}
          >
            Sign Up
          </Button>
        </Flex>
      </Box>
    </Flex>
    </motion.div>
  );
};

export default LoginPage;

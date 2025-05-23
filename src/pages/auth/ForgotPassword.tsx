import {
  Box,
  Flex,
  TextInput,
  PasswordInput,
  Button,
  Stack,
  Title,
  Text,
  Center,
  Group,
  Tooltip,
  Image,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import theme from '../../utils/theme';
import whiteLogo from '../../assets/libroflow_white_with_text.png';
import blackLogo from '../../assets/libroflow_black_without_text.png'; 
import { motion } from "framer-motion";
import { getPageVariants, pageTransition } from '../../animations/authPageTransitions';
import { poppyVariant } from '../../animations/snappySlide';
import classes from './ForgotPassword.module.css';

import 'react-phone-input-2/lib/style.css';
import { useState as useReactState } from 'react';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // Step 1: Email, Step 2: OTP, Step 3: Password Reset

  const formEmail = useForm({
    initialValues: {
      email: '',
    },
    validate: {
      email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const formOTP = useForm({
    initialValues: {
      otp: '',
    },
    validate: {
      otp: (value: string) => (value.length === 6 ? null : 'OTP must be 6 digits'),
    },
  });

  const formPassword = useForm({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validate: {
      password: (value: string) => (value.length < 6 ? 'Password must be at least 6 characters' : null),
      confirmPassword: (value: string, values: { password: any }) =>
        value !== values.password ? 'Passwords do not match' : null,
    },
  });

  const handleEmailSubmit = (values: typeof formEmail.values) => {
    setStep(2); // Move to OTP step
  };

  const handleOTPSubmit = (values: typeof formOTP.values) => {
    setStep(3); // Move to password reset step
  };

  const handlePasswordSubmit = (values: typeof formPassword.values) => {
    navigate('/login'); // Redirect to login after password reset
  };

return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={poppyVariant}
    >
    <Flex direction={{ base: 'column', md: 'row' }} className={classes.container}>
      {/* Left Side - Dark */}
      
      <Box
        w={{ base: '100%', md: '60%' }}
        h="100%"
        className={classes.darkBlueBox}
      >
        
        <Flex direction="column" align="center" justify="center" className={classes.darkBlueBoxContent}>
          <Image src={whiteLogo} alt="LibroFlow Logo" w="500px" />

          <Text size="46px" mb="50px" ta="center">
            "Streamline Your Bookstore <br /> & Library Operations with Ease."
          </Text>
          <Text size="lg" mb="sm" ta="center">
            Remember your password?
          </Text>

          <Button
            w={{ base: '100%', md: '50%' }}
            color={theme.colors.blueishGrey}
            radius="md"
            size="md"
            className={classes.logInButton}
            onClick={() => navigate('/login')}
          >
            Log In
          </Button>
        </Flex>
        
      </Box>


      {/* Right Side - White */}
      <Box
        w={{ base: '100%', md: '50%' }}
        h="100%"
        style={{
          backgroundColor: '#FFFFFF',
          padding: '2rem',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {step > 1 && (
          <Button
            onClick={() => setStep(step - 1)}
            variant="outline"
            color="black"
            radius="md"
            size="sm"
            style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              backgroundColor: 'white',
              borderColor: '#ccc',
              zIndex: 10,
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
          >
            ← Back
          </Button>
        )}
        <Box w="100%" maw={400}>
          {/* Logo Above Title */}
          <Center>
            <Image src={blackLogo} alt="LibroFlow Logo" w={170} mb={10} mt={-20} />
          </Center>
          <Box>
          {step === 1 && (
            <form onSubmit={formEmail.onSubmit(handleEmailSubmit)}>
              <Flex direction="column" align="center" mt="md">
                <Title order={1} mb="md" c={theme.colors.darkBlue}>
                  Forgot Password
                </Title>
                <Text size="sm" c="dimmed" ta="center" mb="10px">
                  Please enter your email address to receive a password reset link.
                </Text>
              </Flex>
              <Stack>
                <Text size="sm" mb={4} fw={500}>Email</Text>
                <TextInput
                  placeholder="you@example.com"
                  {...formEmail.getInputProps('email')}
                  required
                  className={classes.formInput}
                />
                <Button type="submit" fullWidth color={theme.colors.darkBlueLighter} radius="md" size="md">
                  Submit
                </Button>
              </Stack>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={formOTP.onSubmit(handleOTPSubmit)}>
              <Flex direction="column" align="center" mt="md">
                <Title order={1} mb="md" c={theme.colors.darkBlue}>
                  Enter OTP
                </Title>
                <Text size="sm" c="dimmed" ta="center" mb="10px">
                  Please enter the OTP sent to your email address.
                </Text>
              </Flex>
              <Stack>
                <Text size="sm" mb={4} fw={500}>OTP</Text>
                <TextInput
                  placeholder="Enter OTP"
                  {...formOTP.getInputProps('otp')}
                  required
                  className={classes.formInput}
                />
                <Button type="submit" fullWidth color={theme.colors.darkBlueLighter} radius="md" size="md">
                  Verify OTP
                </Button>
              </Stack>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={formPassword.onSubmit(handlePasswordSubmit)}>
              <Flex direction="column" align="center" mt="md">
                <Title order={1} mb="sm" c={theme.colors.darkBlue}>
                  Reset Password
                </Title>
                <Text size="sm" c="dimmed" ta="center" mb={30}>
                  Please enter your new password.
                </Text>
              </Flex>
              <Stack>
                <Text size="sm" mb={4} fw={500}>New Password</Text>
                <PasswordInput
                  placeholder="Your new password"
                  {...formPassword.getInputProps('password')}
                  required
                  className={classes.formInput}
                />
                <Text size="sm" mb={4} fw={500}>Confirm Password</Text>
                <PasswordInput
                  placeholder="Confirm your new password"
                  {...formPassword.getInputProps('confirmPassword')}
                  required
                  className={classes.formInput}
                />
                <Button type="submit" fullWidth color={theme.colors.darkBlueLighter} radius="md" size="md">
                  Submit New Password
                </Button>
              </Stack>
            </form>
          )}

</Box>

        </Box>
      </Box>
    </Flex>
    </motion.div>
  );
};

export default ForgotPassword;
function useState<T>(initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
    return useReactState(initialValue);
}
    
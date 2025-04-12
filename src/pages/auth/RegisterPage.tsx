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
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const RegisterPage = () => {
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      username: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },

    validate: {
      email: (value: string) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value: string ) => (value.length < 6 ? 'Password must be at least 6 characters' : null),
      confirmPassword: (value: string, values: { password: any; }) =>
        value !== values.password ? 'Passwords do not match' : null,
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    console.log('Register submitted:', values);
  };

  return (
    <Flex direction={{ base: 'column', md: 'row' }} style={{ height: '100vh', width: '100vw' }}>
      {/* Left Side - Dark */}
      <Box
        w={{ base: '100%', md: '60%' }}
        h="100%"
        style={{
          backgroundColor: theme.colors.darkBlueLighter,
          color: 'white',
          borderTopRightRadius: '3rem',
          borderBottomRightRadius: '3rem',
        }}
      >
        <Flex direction="column" align="center" justify="center" style={{ height: '98%', padding: '1rem' }}>
          <Image src={whiteLogo} alt="LibroFlow Logo" w="500px" />

          <Text size="46px" mb="50px" ta="center">
            Streamline Your Bookstore <br /> & Library Operations with Ease.
          </Text>

          <Text size="lg" mb="sm" ta="center">
            Already have an account? Sign In Now!
          </Text>

          <Button
            w={{ base: '100%', md: '50%' }}
            color={theme.colors.blueishGrey}
            radius="md"
            size="md"
            style={{ marginTop: '0.5rem' }}
            onClick={() => navigate('/login')}
          >
            Log In
          </Button>
        </Flex>
      </Box>

      {/* Right Side - White */}
      <Box
        w={{ base: '100%', md: '50%' }}
        h="90%"
        style={{ backgroundColor: theme.colors.white }}
      >
        <Flex direction="column" align="center" justify="center" style={{ height: '100%', padding: '2rem' }}>
          <Box w="100%" maw={400}>
            <Flex direction="column" align="center">
              <Title order={1} mb="md" c={theme.colors.darkBlue}>
                Sign Up
              </Title>
              <Text size="sm" c="dimmed" mb="lg">
                Provide your information to create an account.
              </Text>
            </Flex>

            <form onSubmit={form.onSubmit((values) => console.log(values))}>
  <Stack>
    {/* Email */}

      <Text mb={-10}>Email</Text>


    <TextInput
      placeholder="you@example.com"
      {...form.getInputProps('email')}
      required
    />

    {/* Name Fields */}
    <Flex gap="md">
      <Box w="100%">
          <Text>First Name</Text>
        <TextInput
          placeholder="John"
          {...form.getInputProps('firstName')}
          required
        />
      </Box>

      <Box w="100%">       
          <Text>Last Name</Text>
        <TextInput
          placeholder="Doe"
          {...form.getInputProps('lastName')}
          required
        />
      </Box>
    </Flex>

    {/* Username */}   
      <Text mb={-10}>Username</Text>
    <TextInput
      placeholder="john_doe"
      {...form.getInputProps('username')}
      required
    />

    {/* Phone */}  
      <Text mb={-10}>Phone Number</Text>
    <PhoneInput
      country={'us'}
      value={form.values.phone}
      onChange={(phone) => form.setFieldValue('phone', phone)}
      inputStyle={{
        width: '100%',
        height: '40px',
        border: '1px solid #ced4da',
        borderRadius: '8px',
        fontSize: '14px',
        paddingLeft: '48px',
        color: '#000',
        backgroundColor: '#fff',
      }}
      buttonStyle={{
        borderRight: '1px solid #ced4da',
        backgroundColor: '#fff',
      }}
      inputProps={{ name: 'phone', required: true }}
    />

    {/* Password */}
    <Group  align="center" mb={-10}>
      <Text>Password</Text>
      <Tooltip label="Min 6 characters. Use upper, lower, and numbers." withArrow>
        <Text c="dimmed" size="sm" style={{ cursor: 'pointer' }}>ℹ️</Text>
      </Tooltip>
    </Group>
    <PasswordInput
      placeholder="Your password"
      {...form.getInputProps('password')}
      required
    />

    {/* Confirm Password */}   
      <Text mb={-10}>Confirm Password</Text>
    <PasswordInput
      placeholder="Repeat password"
      {...form.getInputProps('confirmPassword')}
      required
    />

    {/* Buttons */}
    <Flex direction="column" align="center" mt="md" gap="xs">
      <Button
        type="submit"
        fullWidth
        color={theme.colors.darkBlueLighter}
        radius="md"
        size="md"
      >
        Sign Up
      </Button>
      
    </Flex>
  </Stack>
</form>

          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default RegisterPage;

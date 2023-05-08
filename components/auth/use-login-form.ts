import * as yup from 'yup'

export function useLoginForm() {
  const schema = yup.object().shape({
    username: yup
      .string()
      .required('Please enter username')
      .min(4, 'username requires at least 4 chars'),

    password: yup
      .string()
      .required('Please enter password')
      .min(6, 'password requires at least 6 chars'),
  })

  return { schema }
}

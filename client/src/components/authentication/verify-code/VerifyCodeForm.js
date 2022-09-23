import * as Yup from "yup";
import { useSnackbar } from "notistack5";
import { Icon } from "@iconify/react";
import { Form, FormikProvider, useFormik } from "formik";
// material
import { OutlinedInput, FormHelperText, Stack } from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";
// routes
import useAuth from "../../../hooks/useAuth";
import useIsMountedRef from "../../../hooks/useIsMountedRef";
//
import { MIconButton } from "../../@material-extend";
import closeFill from "@iconify/icons-eva/close-fill";
// utils
// import fakeRequest from '../../../utils/fakeRequest';

// ----------------------------------------------------------------------

// eslint-disable-next-line consistent-return
function maxLength(object) {
  if (object.target.value.length > object.target.maxLength) {
    return (object.target.value = object.target.value.slice(
      0,
      object.target.maxLength
    ));
  }
}

export default function VerifyCodeForm() {
  const { verifyEmail, setAuthModal } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const VerifyCodeSchema = Yup.object().shape({
    code1: Yup.number().required("Code is required"),
    code2: Yup.number().required("Code is required"),
    code3: Yup.number().required("Code is required"),
    code4: Yup.number().required("Code is required"),
    code5: Yup.number().required("Code is required"),
    code6: Yup.number().required("Code is required"),
  });

  const formik = useFormik({
    initialValues: {
      code1: "",
      code2: "",
      code3: "",
      code4: "",
      code5: "",
      code6: "",
    },
    validationSchema: VerifyCodeSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        const { code1, code2, code3, code4, code5, code6 } = values;
        await verifyEmail(`${code1}${code2}${code3}${code4}${code5}${code6}`);
        setAuthModal("congrat");
        enqueueSnackbar("Email is verified successfully!", {
          variant: "success",
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          ),
        });
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        console.error(error);
        enqueueSnackbar("Email verify failed! Please resend email", {
          variant: "error",
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          ),
        });
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.message });
          setSubmitting(false);
        }
      }
    },
  });

  const {
    values,
    errors,
    isValid,
    touched,
    isSubmitting,
    handleSubmit,
    getFieldProps,
  } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack direction="row" spacing={2} justifyContent="center">
          {Object.keys(values).map((item) => (
            <OutlinedInput
              key={item}
              {...getFieldProps(item)}
              type="number"
              placeholder="-"
              onInput={maxLength}
              error={Boolean(touched[item] && errors[item])}
              inputProps={{
                maxLength: 1,
                sx: {
                  p: 0,
                  textAlign: "center",
                  width: { xs: 36, sm: 56 },
                  height: { xs: 36, sm: 56 },
                },
              }}
            />
          ))}
        </Stack>

        <FormHelperText error={!isValid} style={{ textAlign: "right" }}>
          {!isValid && "Code is required"}
        </FormHelperText>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{ mt: 3 }}
        >
          Verify
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}

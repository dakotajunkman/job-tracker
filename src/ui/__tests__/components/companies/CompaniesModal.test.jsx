import React from 'react';
import {render} from '@testing-library/react';
import CompaniesModal from '../../../components/companies/CompaniesModal';
import '@testing-library/jest-dom';
import {ChakraProvider} from '@chakra-ui/react';
import {mockMatchMedia} from '../../util/util';
import companiesJson from '../../../public/json/companiesExample.json';

mockMatchMedia();
const DEFAULT_PROPS = {
  header: 'Open Applications',
  isOpen: true,
  onClose: jest.fn(),
  companies: companiesJson,
  token:
    'eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc3Y2MwZWY0YzcxODFjZjRjMGRjZWY3YjYwYWUyOGNjOTAyMmM3NmIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI5MTAzMDAxOTU5Mi1pNTEzZXJydGczdnRycGQxaDh2ZXRjZ285aDJ1aTFzNi5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsImF1ZCI6IjkxMDMwMDE5NTkyLWk1MTNlcnJ0ZzN2dHJwZDFoOHZldGNnbzloMnVpMXM2LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA4MTgxMDQwMzAzMDY5MDM4NjU5IiwiaGQiOiJvcmVnb25zdGF0ZS5lZHUiLCJlbWFpbCI6Im5vbGFubkBvcmVnb25zdGF0ZS5lZHUiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IndvbVFRUTlMZWF3VjlfTWpSanBOcFEiLCJuYW1lIjoiTmljIE5vbGFuIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FMbTV3dTFtQXBlY09uRzdNdVh0ME8tb1FydWE4WklHdUNCajdOaTYtekhOPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6Ik5pYyIsImZhbWlseV9uYW1lIjoiTm9sYW4iLCJsb2NhbGUiOiJlbiIsImlhdCI6MTY2NzM2MTEyMiwiZXhwIjoxNjY3MzY0NzIyfQ.G1KuNr4-CKR095eD7VH0VmP1zAvqFSgcDaM9Z6-HHEOAsCoUtBcdOS1tAAcWb-AaS7P4XoHghoPPX2YZDvuFLF-gr3uqC_rMAXvoMwMN-VL_ZNBT-2-2EGNjQjA4tAslfLCAtJy3_XGFjMplADRfQaY9wAERmHr68wjp3t5e_NlvRMc81nXH5-ZSpGVMtHwCEBwZTBE1LH36a7483BC4BQ2Pj2V0qJTshxuo283BLhE4gnIcXKu9wit5HzIy-84i2eqXZzJymlLw_6cI2gp2brI3bJJA9BFvpoPyuulud5AE-qfLp85WYITU3PJhA8IKwVs18AE19ua1rjbpPQI5UA',
  addCompany: jest.fn(),
};

describe('CompaniesModal', () => {
  const setup = (props = DEFAULT_PROPS) => {
    return render(
      <ChakraProvider resetCSS>
        <CompaniesModal {...props} />
      </ChakraProvider>
    );
  };

  it('renders', () => {
    const component = setup();
    expect(component).toBeTruthy();
  });

  it('renders a dialog', () => {
    const component = setup();
    const dialog = component.getByRole('dialog', {name: DEFAULT_PROPS.header});
    expect(dialog).toBeInTheDocument();
  });

  it('renders buttons', () => {
    const BUTTON_NAMES = ['Close', 'Cancel', 'Save'];
    const component = setup();
    BUTTON_NAMES.forEach(name => {
      const button = component.getByRole('button', {name: name});
      expect(button).toBeInTheDocument();
    });
  });

  it('renders form text', () => {
    const FORM_TEXT = ['Company Name'];
    const component = setup();
    FORM_TEXT.forEach(text => {
      const formText = component.getByText(text);
      expect(formText).toBeInTheDocument();
    });
  });
});

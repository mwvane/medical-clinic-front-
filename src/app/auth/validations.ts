export class Validations {
  public static isEmailValid(email: string) {
    const reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (email && email.trim()) {
      return reg.test(email);
    }
    return false;
  }

  public static isIdentityNumberValid(ID: number) {
    if (ID && String(ID).length === 11) {
      return true;
    }
    return false;
  }

  public static isPasswordValid(password: string) {
    let errors: string[] = [];
    if (password) {
      if (password) {
        if (password.length < 8) {
          errors.push('Your password must be at least 8 characters');
        }
        if (password.search(/[a-z]/i) < 0) {
          errors.push('Your password must contain at least one letter.');
        }
        if (password.search(/[0-9]/) < 0) {
          errors.push('Your password must contain at least one digit.');
        }
      }
    }
    return errors.length ? errors : true;
  }
}

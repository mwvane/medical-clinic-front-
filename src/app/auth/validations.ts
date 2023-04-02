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
          errors.push('პაროლი უნდა შეიცავდეს მინიმუმ 8 სიმბოლოს');
        }
        if (password.search(/[A-Z]/) < 0) {
          errors.push('პაროლი უნდა შეიცავდეს კაპიტალურ სიმბოლოს');
        }
        if (password.search(/[0-9]/) < 0) {
          errors.push('პაროლი უნდა შეიცავდეს ციფრს');
        }
      }
    }
    return errors.length ? errors : true;
  }
}

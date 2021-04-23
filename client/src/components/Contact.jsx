import PageHeader from './layout/PageHeader';
import emailjs from 'emailjs';

const Contact = () => {
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'gmail',
        'template_3leqo1h',
        e.target,
        'user_NhjvQhQwe8FjfolKR4A82'
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <>
      <div className="container">
        <PageHeader titleText={'Contact Us'} />{' '}
        <div className="row">
          <div className="col-12">
            <h3 className="mb-5">
              Feel free to contact us with any comment or a problem you might
              have
            </h3>
            <p className="t-lead">
              <strong>Phone:</strong> 0502027429
            </p>
            <div className="line"></div>
            <h2 className="text-center">Send A Message</h2>
            <form onSubmit={sendEmail}>
              <div className="col-8 form-group mx-auto">
                <input
                  id="name"
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Name..."
                />
              </div>
              <div className="col-8 form-group mx-auto">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Email..."
                />
              </div>
              <div className="col-8 form-group mx-auto">
                <input
                  type="email"
                  className="form-control"
                  name="subject"
                  placeholder="Subject..."
                />
              </div>
              <div className="col-8 form-group mx-auto">
                <textarea
                  className="form-control"
                  name="message"
                  id=""
                  cols="30"
                  rows="10"
                  placeholder="Message..."
                ></textarea>
              </div>
              <div className="col-8 form-group mx-auto">
                <input
                  type="submit"
                  className="btn btn-info"
                  value="Send Message"
                />
              </div>
            </form>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default Contact;

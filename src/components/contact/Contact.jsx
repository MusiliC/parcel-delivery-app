import React from "react";

const Contact = () => {
  return (
    <section className="py-24 min-h-[90vh] lg:mon-h-[80vh]">
      <div className="w-5/6 md:w-4/6 lg:w-5/6 mx-auto py-10">
        <div className="mb-8">
          <h2 className=" text-2xl lg:w-4/6 mx-auto font-semibold mb-2">
            Contact Us:
          </h2>
          <p className="lg:w-4/6 mx-auto text-sm">
            Hello our happy client, you can reach us through our email:{" "}
            <span className="font-bold text-lg text-primary-500">sendIt01@gmail.com</span> or contact us using the form
            below. Just reach us your concerns or any questions and you will get immediate
            response with the help you need. Thank you!
          </p>
        </div>
        <div className="lg:w-4/6 mx-auto">
          <form action="">
            <div>
              <label htmlFor="">Your Name:</label>
              <input type="text" className="inputStyles" />
            </div>
            <div>
              <label htmlFor="">Email:</label>
              <input type="text" className="inputStyles" />
            </div>
            <div>
              <label htmlFor="" className="">
                Text Body:
              </label>
              <textarea
                name=""
                className="inputStyles"
                id=""
                cols="4"
                rows="4"
              ></textarea>
            </div>
            <div className="flex justify-center">
              <button className="button">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

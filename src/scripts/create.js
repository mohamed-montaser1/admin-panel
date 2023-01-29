const fs = require("fs");
const component = process.argv[2];
const exec = require("child_process").exec;

fs.readFile("./src/components/template.html", "utf-8", (err, source) => {
  if (err) return console.error("error is:   " + err);
  // replace the "COMPONENT_NAME" with component will dev enter it by terminal
  const content = source.replace(/COMPONENT_NAME/g, component);
  // check if the component already exist
  if (fs.existsSync(`./src/components/${component}.html`)) {
    return console.error(`${component} is already exist, use another name`);
  }

  // create component.html
  fs.writeFile(`./src/components/${component}.html`, content, (err) => {
    if (err)
      console.error(`there is error in creating the ${component}.html file`);
    else {
      // create sass file
      fs.writeFile(
        `./src/assets/sass/components/${component}.scss`,
        "",
        (err) => {
          if (err)
            console.error(`there is problem in create ${component}.scss file`);
          console.log("component created successfully");
          fs.appendFile(
            "./src/assets/sass/components/_components.scss",
            `@import "${component}"; \n`,
            (err) => {
              if (err)
                return console.error(
                  `there is error in create ${component}.scss file`
                );
              // to open component.html file in editor
              exec(`code -r ./src/components/${component}.html`, (err) => {
                if (err) console.error(err);
              });
              // to open component.scss file in editor
              exec(
                `code -r ./src/assets/sass/components/${component}.scss`,
                (err) => {
                  if (err) console.error(err);
                }
              );
            }
          );
        }
      );
    }
  });
});

'use strict';

var dataApp = () => {
  const mrc = window.myResourceClass;
  const mrf = window.myResourceFunction;

  if (!localStorage.getItem("ls-flex-direction")) {
    localStorage.setItem("ls-flex-direction", "false");
  }

  require.config({
    paths: {
      vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.39.0/min/vs",
    },
  });

  const dataApp = {
    routes: new mrc.MatchPath(),

    url: {
      server: (path) => {
        const object = JSON.parse(localStorage.getItem("ls-object-storage"));
        return object.url + path;
      },
    },

    signal: new mrc.Signal(),

    signals: {
      uploads: mrf.signal([]),
      uploads2: mrf.signal([]),
      moves: mrf.signal([]),
      copies: mrf.signal([]),
      selects: mrf.signal([]),
      isSelect: mrf.signal(true),
      uploadInfo: mrf.signal({}),
    },
    elements: {
      metaThemeColor: document.getElementById("meta-theme-color"),
      styleApp: document.getElementById("style-app"),
      codeEditor: (function () {
        const $element = document.createElement("div");
        $element.style.width = "100%";
        $element.style.height = "100%";
        return $element;
      })(),
    },
    values: {
      direction: localStorage.getItem("ls-flex-direction") == "true",
    },
    function: {
      scrollY: (parameters) => {
        let isDragging = false;
        let startX;
        let scrollLeft;

        const scrollContainer = parameters.target;

        scrollContainer?.addEventListener("mousedown", (e) => {
          isDragging = true;
          startX = e.pageX - scrollContainer.offsetLeft;
          scrollLeft = scrollContainer.scrollLeft;

          parameters?.events?.start?.(e);
        });

        scrollContainer?.addEventListener("mouseleave", (e) => {
          if (isDragging) {
            isDragging = false;
            parameters?.events?.end?.(e);
          }
        });

        scrollContainer?.addEventListener("mouseup", (e) => {
          if (isDragging) {
            isDragging = false;
            parameters?.events?.end?.(e);
          }
        });

        scrollContainer?.addEventListener("mousemove", (e) => {
          if (!isDragging) return;
          e.preventDefault();
          const x = e.pageX - scrollContainer.offsetLeft;
          const walk = x - startX;
          scrollContainer.scrollLeft = scrollLeft - walk;

          parameters?.events?.move?.(e);
        });
      },
    },
    functions: {
      callbackIf: (value, callback) => {
        if (typeof callback == "function" && Boolean(value)) {
          callback(value);
        }

        return value;
      },
      scrollY: (parameters) => {
        let isDragging = false;
        let startX;
        let scrollLeft;

        const scrollContainer = parameters.target;

        scrollContainer?.addEventListener("mousedown", (e) => {
          isDragging = true;
          startX = e.pageX - scrollContainer.offsetLeft;
          scrollLeft = scrollContainer.scrollLeft;

          parameters?.events?.start?.(e);
        });

        scrollContainer?.addEventListener("mouseleave", (e) => {
          if (isDragging) {
            isDragging = false;
            parameters?.events?.end?.(e);
          }
        });

        scrollContainer?.addEventListener("mouseup", (e) => {
          if (isDragging) {
            isDragging = false;
            parameters?.events?.end?.(e);
          }
        });

        scrollContainer?.addEventListener("mousemove", (e) => {
          if (!isDragging) return;
          e.preventDefault();
          const x = e.pageX - scrollContainer.offsetLeft;
          const walk = x - startX;
          scrollContainer.scrollLeft = scrollLeft - walk;

          parameters?.events?.move?.(e);
        });
      },
    },
    codeEditor: null,
    codeEditorPromise: null,
    promises: {},
    instances: {
      IntersectionObserver: new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            entry.target.dispatchEvent(
              new CustomEvent("_IntersectionObserver", {
                detail: {
                  entry,
                  observer,
                },
              })
            );
          });
        },
        { root: null, rootMargin: "0px", threshold: 0 }
      ),
    },
    events: (array, type, callback, options = null) => {
      const elements = Array.isArray(array) ? array : [array];

      return elements.map((element) => {
        try {
          element.addEventListener(type, callback, options);
          return () => {
            element.removeEventListener(type, callback, options);
          };
        } catch (error) {
          return () => {};
        }
      });
    },

    customEvent: {
      hashchange: new CustomEvent("hashchange"),
      _refreshfolder: new CustomEvent("_refreshfolder"),
    },
  };

  dataApp.function.formatBytes = (bytes) => {
    const units = ["Bytes", "KB", "MB", "GB", "TB"];
    let index = 0;

    while (bytes >= 1024 && index < units.length - 1) {
      bytes /= 1024;
      index++;
    }

    return `${bytes.toFixed(2)} ${units[index]}`;
  };

  dataApp.functions.formatBytes = (bytes) => {
    const units = ["Bytes", "KB", "MB", "GB", "TB"];
    let index = 0;

    while (bytes >= 1024 && index < units.length - 1) {
      bytes /= 1024;
      index++;
    }

    return {
      number: bytes,
      unit: units[index],
    };

    // return `${bytes.toFixed(2)} ${units[index]}`;
  };

  dataApp.codeEditorPromise = new Promise((resolve, reject) => {
    require(["vs/editor/editor.main"], function () {
      dataApp.codeEditor = monaco.editor.create(dataApp.elements.codeEditor, {
        value: "",
        language: "plaintext", // Lenguaje (HTML con CSS y JS soportados)
        theme: "vs-dark", // Tema oscuro
        automaticLayout: true, // Ajuste automático del diseño
        minimap: {
          enabled: false, // Desactiva el minimapa
        },
      });

      resolve(dataApp.codeEditor);
    });
  });

  return dataApp;
};

var navigate = () => {
  const mrc = window.myResourceClass;
  const mrf = window.myResourceFunction;
  const svg = window.svgIcons;

  const myVal = {
    routes: new mrc.MatchPath(),
    element: {
      textNode: document.createTextNode(""),
    },
  };

  const $element = mrf.createElement(/*html*/ `
        <div class="div_kpAeq7EQQSpIEGP" >
            <div class="div_AzB9StLbTItJbDG">
                <div class="div_JJ29L3eoT4hcf1x">
                    <div id="links" class="div_ynsbf8jCYmc6NsK">
                        <a id="inicio" href="#/">
                          ${svg("fi fi-rr-house-blank")}
                        </a>
                        <a id="greet" href="#/greet" >
                          ${svg("fi fi-rr-cake-birthday")}
                        </a>
                        <a id="image" href="#/gallery" >
                          ${svg("fi fi-rr-picture")}
                        </a>
                        <a id="time" href="#/time" >
                          ${svg("fi fi-rr-hourglass-end")}
                        </a>
                    </div>
                </div>
            </div>
        </div>    
    `);
  const $elements = mrf.objectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  myVal.routes.set("hash", [
    { hash: "/", element: $elements.inicio },
    { hash: "/greet", element: $elements.greet },
    { hash: "/audio", element: $elements.audio },
    { hash: "/gallery", element: $elements.image },
    { hash: "/time", element: $elements.time },
    { hash: "/*", element: document.createElement("a") },
  ]);

  addEventListener("hashchange", () => {
    const get = myVal.routes.get(location.hash.slice(1));

    Array.from($elements.links.querySelectorAll("a")).forEach((a) =>
      a.classList.remove("active")
    );

    get.data.element.classList.add("active");
  });

  return $element;
};

var navigateBottom = () => {
  const mrc = window.myResourceClass;
  const mrf = window.myResourceFunction;
  const svg = window.svgIcons;
  const myVal = {
    routes: new mrc.MatchPath(),
    element: {
      textNode: document.createTextNode(""),
    },
  };

  const $element = mrf.createElement(/*html*/ `
        <div class="div_U1rCCk1">
            <div id="links" class="div_ZnL3gfK">
                <a id="inicio" href="#/">
                  ${svg("fi fi-rr-house-blank")}
                </a>
                <a id="greet" href="#/greet" >
                  ${svg("fi fi-rr-cake-birthday")}
                </a>
                <a id="image" href="#/gallery" >
                  ${svg("fi fi-rr-picture")}
                </a>
                <a id="time" href="#/time" >
                  ${svg("fi fi-rr-hourglass-end")}
                </a>
            </div>
        </div>
  `);

  const $elements = mrf.objectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  myVal.routes.set("hash", [
    { hash: "/", element: $elements.inicio },
    { hash: "/greet", element: $elements.greet },
    { hash: "/audio", element: $elements.audio },
    { hash: "/gallery", element: $elements.image },
    { hash: "/time", element: $elements.time },
    { hash: "/*", element: document.createElement("a") },
  ]);

  addEventListener("hashchange", () => {
    const get = myVal.routes.get(location.hash.slice(1));

    Array.from($elements.links.querySelectorAll("a")).forEach((a) =>
      a.classList.remove("active")
    );

    get.data.element.classList.add("active");
  });

  return $element;
};

var eleConfirm = (data = {}) => {
  const mrf = window.myResourceFunction;

  const $element = mrf.createElement(`
        <div class="div_JPq256o153cnJou">
            <div id="closeElement" class="div_OB5OjfKM9h37trb"></div>
            <div class="div_MOTVHQnePjBi13b scroll-y">
                <div class="div_bjK30KXuRq196kA">
                    <h3>${data.title ?? ""}</h3>
                    <button id="btnCloseElement"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M23.707.293h0a1,1,0,0,0-1.414,0L12,10.586,1.707.293a1,1,0,0,0-1.414,0h0a1,1,0,0,0,0,1.414L10.586,12,.293,22.293a1,1,0,0,0,0,1.414h0a1,1,0,0,0,1.414,0L12,13.414,22.293,23.707a1,1,0,0,0,1.414,0h0a1,1,0,0,0,0-1.414L13.414,12,23.707,1.707A1,1,0,0,0,23.707.293Z"></path></svg></button>
                </div>
                <div class="div_jrf0YNBRjlfJtgq">
                    <p>${data.message ?? ""}</p>
                </div>
                <label class="label_z6VMyXQ">
                    <div>
                      <input id="inputCheckbox" type="checkbox">
                    </div>
                    <span>${data.checkboxText ?? ""}</span>
                  </label>
                <div class="div_vM8uRjaCFHrm0g2">
                    <button id="buttonCancel" class="button_8m7It5KUpV1th9m pointer">Cancelar</button>
                    <button id="buttonConfirm" class="button_8m7It5KUpV1th9m pointer dark">Confirmar</button>
                </div>
            </div>
        </div>
  `);

  const {
    closeElement,
    btnCloseElement,
    buttonCancel,
    buttonConfirm,
    inputCheckbox,
  } = mrf.objectElement($element.querySelectorAll("[id]"), "id", true);

  const elementDispatchFalse = new CustomEvent("_click", {
    detail: { status: false, checkbox: false },
  });

  Array.from([closeElement, btnCloseElement, buttonCancel]).forEach(
    (element) => {
      element.addEventListener("click", () => {
        $element.remove();
        $element.dispatchEvent(elementDispatchFalse);
      });
    }
  );

  buttonConfirm.addEventListener("click", () => {
    $element.remove();
    $element.dispatchEvent(
      new CustomEvent("_click", {
        detail: { status: true, checkbox: inputCheckbox.checked },
      })
    );
  });

  return $element;
};

// import optionFile from "../components/options/optionFile";

var footerPlayer = () => {
  const mrc = window.myResourceClass;
  const mrf = window.myResourceFunction;
  const svg = window.svgIcons;

  const myApp = window.dataApp;
  ({
    signal: {
      selects: mrf.signal(),
    },
  });

  const $element = mrf.createElement(/*html*/ `
        <footer class="footer_rzOONmQ">
            <div class="div_qJuwHSf">
                <button id="buttonCancel" class="button_OTS5WjT">
                  ${svg("fi fi-rr-cross")}
                </button>
                <span id="spanCount" class="span_yfGRwa">0</span>
                <button id="buttonMove" class="button_OTS5WjT" style="display:none">
                  ${svg("fi fi-rr-move-to-folder-2")}
                </button>
                <button id="buttonCopy" class="button_OTS5WjT" style="display:none">
                  ${svg("fi fi-rr-copy-alt")}
                </button>
                <button id="buttonOption" class="button_OTS5WjT">
                  ${svg("fi fi-rr-menu-dots-vertical")}
                </button>
            </div>

            <div id="popoverOptions" class="div_hhQ38lUBOqr9PE" popover>
              <div class="div_MAZ9BVyhJE4O9HF">
                  <div class="div_00eYHleYM5CcmWw">
                      <div class="div_j2E4qpFKf5mTqyf">
                          <div id="itemTrue" class="div_TwR0YoQl6BlKpR"></div>
                      </div>
                  </div>
              </div>
            </div>
        </footer>
    `);

  const $elements = mrf.objectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  myApp.signals.selects.on((Data) => {
    $elements.spanCount.textContent = Data.length;
    $element.style.display = Data.length ? "" : "none";
  });

  $elements.buttonMove.addEventListener("click", () => {
    const object = JSON.parse(localStorage.getItem("ls-object-storage"));

    const items = myApp.signals.selects.value;

    const dir = mrc.Trim.both(
      decodeURIComponent(myApp.routes.params().route ?? ""),
      "/"
    );

    const encodeQueryString = mrf.encodeToParams({
      token: object.token,
      dir_storage: object.dir,
      action: "update",
    });

    const formData = new FormData();
    formData.append(
      "folders_and_files",
      JSON.stringify(
        items.map((item) => {
          return {
            now_pathname: mrc.Trim.both(
              decodeURIComponent(item.pathname ?? ""),
              "/"
            ),
            new_pathname: dir,
            now_basename: item.basename,
            new_basename: item.basename,
            is_dir: item.is_dir,
            is_file: item.is_file,
          };
        })
      )
    );

    fetch(myApp.url.server(`/both.php?${encodeQueryString}`), {
      method: "POST",
      body: formData,
    }).then(() => {
      dispatchEvent(myApp.customEvent._refreshfolder);
    });

    $elements.buttonCancel.click();
  });

  $elements.buttonCopy.addEventListener("click", () => {
    const object = JSON.parse(localStorage.getItem("ls-object-storage"));

    const items = myApp.signals.selects.value;

    mrc.Trim.both(
      decodeURIComponent(myApp.routes.params().route ?? ""),
      "/"
    );

    const encodeQueryString = mrf.encodeToParams({
      token: object.token,
      dir_storage: object.dir,
      action: "copy",
      pathname: mrc.Trim.both(
        decodeURIComponent(myApp.routes.params().route ?? ""),
        "/"
      ),
    });

    console.log(encodeQueryString);
    console.log(
      items.map((item) => {
        return {
          fullname: item.fullname,
          pathname: item.pathname,
          basename: item.basename,
          is_dir: item.is_dir,
          is_file: item.is_file,
        };
      })
    );

    const formData = new FormData();
    formData.append(
      "folders_and_files",
      JSON.stringify(
        items.map((item) => {
          return {
            fullname: mrc.Trim.both(
              decodeURIComponent(item.fullname ?? ""),
              "/"
            ),
            pathname: mrc.Trim.both(
              decodeURIComponent(item.pathname ?? ""),
              "/"
            ),
            basename: item.basename,
            is_dir: item.is_dir,
            is_file: item.is_file,
          };
        })
      )
    );

    fetch(myApp.url.server(`/both.php?${encodeQueryString}`), {
      method: "POST",
      body: formData,
    }).then(() => {
      dispatchEvent(myApp.customEvent._refreshfolder);
    });

    $elements.buttonCancel.click();
    return;
  });

  $elements.buttonCancel.addEventListener("click", () => {
    $elements.buttonMove.style.display = "none";
    $elements.buttonCopy.style.display = "none";
    $elements.buttonOption.style.display = "";

    myApp.signals.selects.value = [];
    myApp.signals.isSelect.value = true;
  });

  $elements.buttonOption.addEventListener("click", () => {
    const array = [
      // {
      //   name: "Favoritos",
      //   action: "favourite",
      //   svg: "fi fi-rr-star",
      // },
      {
        name: "Mover a",
        action: "move",
        svg: "fi fi-rr-move-to-folder-2",
      },
      {
        name: "Copiar en",
        action: "copy",
        svg: "fi fi-rr-copy-alt",
      },
      {
        name: "Renombrar",
        action: "rename",
        svg: "fi fi-rr-pencil",
      },
      {
        name: "Eliminar",
        action: "delete",
        svg: "fi fi-rr-trash",
      },
    ];

    $elements.itemTrue.innerHTML = array
      .map((object) => {
        if (
          myApp.signals.selects.value.length > 1 &&
          ["rename"].includes(object.action)
        )
          return "";

        return `
          <button data-action="${object.action}">
            <small>${svg(object.svg)}</small>
            <span>${object.name}</span>
          </button>
        `;
      })
      .join("");

    $elements.popoverOptions.showPopover();
  });

  myApp.events($elements.popoverOptions, "click", (e) => {
    if (e.target === e.currentTarget) {
      e.currentTarget.hidePopover();
      return;
    }

    const $closest = e.target.closest("[data-action]");
    if ($closest) {
      const action = $closest.dataset.action;
      e.currentTarget.hidePopover();

      switch (action) {
        case "favourite": {
          const items = myApp.signals.selects.value;
          items.forEach((item) => {
            storageJSON(localStorage, "favorite_file", (Data) => {
              const index = Data.findIndex(
                (data) => data.pathname == item.pathname
              );
              if (index == -1) Data.push(item);
              else Data.splice(index, 1);
              return Data;
            });
          });

          break;
        }

        case "rename": {
          const dir = mrc.Trim.both(
            decodeURIComponent(myApp.routes.params().route ?? ""),
            "/"
          );
          const items = myApp.signals.selects.value;
          const name = prompt("Renombrar", items[0].basename);

          if (Boolean(name.trim())) {
            const object = JSON.parse(
              localStorage.getItem("ls-object-storage")
            );
            const encodeQueryString = mrf.encodeToParams({
              token: object.token,
              dir_storage: object.dir,
              action: "update",
            });

            const formData = new FormData();
            formData.append(
              "folders_and_files",
              JSON.stringify(
                items
                  .map((item) => {
                    return {
                      now_pathname: mrc.Trim.both(
                        decodeURIComponent(item.pathname ?? ""),
                        "/"
                      ),
                      new_pathname: dir,
                      now_basename: item.basename,
                      new_basename: name.trim(),
                      is_dir: item.is_dir,
                      is_file: item.is_file,
                    };
                  })
                  .slice(0, 1)
              )
            );

            fetch(myApp.url.server(`/both.php?${encodeQueryString}`), {
              method: "POST",
              body: formData,
            }).then(() => {
              dispatchEvent(myApp.customEvent._refreshfolder);
            });
          }

          $elements.buttonCancel.click();
          break;
        }

        case "delete": {
          const items = myApp.signals.selects.value;
          const array = items;

          if (array.length) {
            const $confirm = eleConfirm({
              title: `Eliminar archivos (<b>${array.length}</b>)`,
              message: `Estas a punto de eliminar <b>${array.length}</b> archivos`,
              checkboxText: "Marque para eliminar",
            });

            $confirm.addEventListener("_click", ({ detail }) => {
              if (detail?.status && detail?.checkbox) {
                const object = JSON.parse(
                  localStorage.getItem("ls-object-storage")
                );

                const encodeQueryString = mrf.encodeToParams({
                  token: object.token,
                  dir_storage: object.dir,
                  action: "delete",
                });

                const formData = new FormData();
                formData.append(
                  "folders_and_files",
                  JSON.stringify(
                    items.map((item) => {
                      return {
                        fullname: mrc.Trim.both(
                          decodeURIComponent(item.fullname ?? ""),
                          "/"
                        ),
                        pathname: mrc.Trim.both(
                          decodeURIComponent(item.pathname ?? ""),
                          "/"
                        ),
                        basename: item.basename,
                        is_dir: item.is_dir,
                        is_file: item.is_file,
                      };
                    })
                  )
                );

                fetch(myApp.url.server(`/both.php?${encodeQueryString}`), {
                  method: "POST",
                  body: formData,
                }).then(() => {
                  myApp.signals.selects.value = [];
                  dispatchEvent(myApp.customEvent._refreshfolder);
                });
              }
            });

            $element.append($confirm);
          }

          break;
        }

        case "move": {
          $elements.buttonOption.style.display = "none";
          $elements.buttonCopy.style.display = "none";
          $elements.buttonMove.style.display = "";

          myApp.signals.isSelect.value = false;

          break;
        }

        case "copy": {
          $elements.buttonOption.style.display = "none";
          $elements.buttonMove.style.display = "none";
          $elements.buttonCopy.style.display = "";

          myApp.signals.isSelect.value = false;

          break;
        }
      }
    }
  });

  return $element;
};

var barUpload = () => {
  const mrf = window.myResourceFunction;

  const myApp = window.dataApp;
  const myVal = {
    signal: {
      changeUpload: mrf.signal(false),
    },
    val: {
      upload: [],
    },
    values: {
      limit: 0,
    },
    functions: {},
  };

  const $element = mrf.createElement(/*html*/ `
        <div class="div_z7tBjaR">
            <a href="#/upload" class="a_u57410eunw">
              <div id="loader" class="loader" style="--var-percentage:50; --var-color-background:var(--app-color-letter)"></div>
              <span id="percentage" class="span_m11bfikp38">0%</span>
              <small id="progress">0/0</small>
            </a>
        </div>
    `);

  const $elements = mrf.objectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  myApp.signals.uploads2.on((array) => {
    $element.style.display = array.length ? "" : "none";
  });

  myApp.signals.uploads.on((Data) => {
    const callbackUpload = (array) => {
      for (const object of array) {
        if (object.end) continue;
        if (object.start) continue;
        if (myVal.values.limit >= 3) break;

        myVal.values.limit += 1;
        object.callback().then(() => {
          myVal.values.limit -= 1;
          callbackUpload(myApp.signals.uploads2.value);
          myVal.functions.updateUpload();
        });
      }
    };

    myApp.signals.uploads2.value = myApp.signals.uploads2.value.concat(
      Data.map((data, index) => {
        const object = {
          ...data,
          progress: 0,
          status: false,
          size: data.file.size,
          end: false,
          start: false,
        };

        const object2 = JSON.parse(localStorage.getItem("ls-object-storage"));

        const encodeQueryString = mrf.encodeToParams({
          token: object2.token,
          dir_storage: object2.dir,
          action: "upload",
          overwrite: data.overwrite,
          pathname: data.dir,
        });

        object.callback = () => {
          return new Promise((resolve) => {
            object.start = true;

            const formData = new FormData();
            formData.append("file", data.file);

            const xhr = data.xhr;
            xhr.open(
              "POST",
              myApp.url.server(`/both.php?${encodeQueryString}`),
              true
            );

            xhr.upload.onprogress = (e) => {
              if (e.lengthComputable) {
                const info = {
                  loaded: e.loaded,
                  total: e.total,
                  progress: (e.loaded / e.total) * 100,
                };

                object.progress = info.loaded;
                object.status = false;

                myVal.functions.updateUpload();
              }
            };

            xhr.onload = () => {
              object.progress = data.file.size;
              object.status = true;
              object.end = true;

              resolve(true);
            };

            xhr.onerror = function () {
              console.error("Error en la solicitud");
              object.end = true;

              resolve(true);
            };

            xhr.ontimeout = function () {
              console.error("La solicitud ha superado el tiempo de espera");
              object.end = true;

              resolve(true);
            };

            xhr.onabort = function () {
              console.log("La solicitud XHR fue abortada.");
              object.end = true;

              resolve(true);
            };

            xhr.send(formData);
          });
        };

        return object;
      })
    );

    callbackUpload(myApp.signals.uploads2.value);
  });

  myVal.functions.updateUpload = () => {
    const reduce = myApp.signals.uploads2.value.reduce(
      (prev, curr) => {
        prev.progress += curr.progress;
        prev.total += curr.size;
        prev.upload += curr.status ? 1 : 0;

        return prev;
      },
      { progress: 0, total: 0, upload: 0 }
    );

    const percentage = (reduce.progress / reduce.total) * 100 || 0.0;

    const data = {
      percentage: {
        current: percentage,
        total: 100,
        currentFormat: `${percentage.toFixed(2)}%`,
      },
      upload: {
        current: reduce.upload,
        total: myApp.signals.uploads2.value.length,
      },
      size: {
        current: reduce.progress,
        total: reduce.total,
        currentFormat: myApp.function.formatBytes(reduce.progress),
        totalFormat: myApp.function.formatBytes(reduce.total),
      },
    };

    $elements.loader.style.setProperty(
      "--var-percentage",
      data.percentage.current
    );

    $elements.progress.textContent = `${data.upload.current} / ${data.upload.total}`;
    // $elements.progressSize.textContent = `${data.size.currentFormat} / ${data.size.totalFormat}`;
    $elements.percentage.textContent = data.percentage.currentFormat;

    myApp.signals.uploadInfo.value = data;
  };

  // $elements.buttonAbort.addEventListener("click", () => {
  //   myApp.signals.uploads2.value.forEach((data) => {
  //     data.xhr.abort();
  //   });

  //   myApp.signals.uploads2.value = [];
  //   myVal.functions.updateUpload();
  // });

  return $element;
};

var inicio = () => {
  const mrf = window.myResourceFunction;

  const myApp = window.dataApp;

  const $element = mrf.createElement(/*html*/ `
      <div style-element-r39url205vkpgfa>
          <img src="./img/web/background.png">
      </div>
  `);

  myApp.elements.metaThemeColor.setAttribute("content", "#F7F1EA");
  document.body.style.background = "#F7F1EA";
  document.documentElement.style.setProperty(
    "--app-color-svg-navigation",
    "#f8378e"
  );
  return $element;
};

var pagesGreet = () => {
  const mrf = window.myResourceFunction;
  const svg = window.svgIcons;

  const myApp = window.dataApp;

  const message1 = `
  21 añitos, es la misma edad en la cuál te conocí, solo se cumple una vez, emocionada por las nuevas cosas que te traerá? De mi parte ya no quiero cumplir mas, pero me emociona y me siento muy feliz por tí, un añito mas de vida, conociste al Victor de 21, me gustaría conocer a la Nickol de 21, es una mezcla entre felicidad y tristeza, felicidad por tu nuevo añito y tristeza porque me gustaría estar donde estas y abrazarte, no soy el cumpleañero pero estoy muy emocionado, ya dime dónde estas que necesito darte un abrazo, necesito hacerlo... Te quiero mucho ♥....
  `;

  const message4 = `
  Tenglo claro que el hablar no es tanto lo mio pero hola, Feliz cumpleaños persona hermosa que hoy cumple un año mas de vida, Feliz cumpleaños y que vengan muchos, pero muchos mas, Te Quiero mucho.
  `;

  const $element = mrf.createElement(/*html*/ `
      <div style-element-knc3raj8m1as2n3>
        <div class="container-letter">
          <h1>Feliz cumpleaños Nickol 🎉🎂🥳</h1>
          <p style="line-height:2.1">${message1}</p>

           <div class="tag_7k8ow2o1kpyl4qd">
            <div class="tag_uiysvsv9usq1bdw">
              <img src="./img/web/background-2.png">
            </div>
            <div class="tag_uiysvsv9usq1bdw" style="padding:10px">
              <audio src="./media/audio/audio-1.m4a" controls controlsList="nodownload"></audio>
            </div>
           </div>

           <div class="tag_7k8ow2o1kpyl4qd">
            
            <div class="tag_uiysvsv9usq1bdw" style="padding:10px">
              <p style="line-height:2.1">${message4}</p>
            </div>

            <div class="tag_takm02ayqmdg7h2" style="padding:10px">
              <button tag-id="buttonOpenVideoOne">
                ${svg("fi fi-sr-play")}
                0:00 / 0:38
                <span></span>
              </button>
              <button tag-id="buttonOpenVideoTwo">
                ${svg("fi fi-sr-play")}
                0:00 / 0:29
                <span></span>
              </button>
            </div>
           </div>
        </div>

        <div class="tag_iwzfvaadjndwsd2">
          <video tag-id="videoOne" src="https://storage.vniox.com/uuid-0196e625-b6e0-77c7-a080-16197237c06b/videos/video-1.mp4" controls controlsList="nodownload"></video>
          <video tag-id="videoTwo" src="https://storage.vniox.com/uuid-0196e625-b6e0-77c7-a080-16197237c06b/videos/video-2.mp4" controls controlsList="nodownload"></video>
        </div>
      </div>
  `);

  

  const $elements = mrf.objectElement(
    $element.querySelectorAll("[tag-id]"),
    "tag-id",
    true
  );

  mrf.event($elements.buttonOpenVideoOne, "click", () => {
    $elements.videoOne.requestFullscreen();
  });

  mrf.event($elements.buttonOpenVideoTwo, "click", () => {
    $elements.videoTwo.requestFullscreen();
  });

  myApp.elements.metaThemeColor.setAttribute("content", "#F7F1EA");
  document.body.style.background = "#F7F1EA";
  document.documentElement.style.setProperty(
    "--app-color-svg-navigation",
    "#000000"
  );

  return $element;
};

var pagesImage = () => {
  const mrf = window.myResourceFunction;

  const myVal = {
    values: {
      images: [
        { url: "./media/image/image-1.jpg" },
        { url: "./media/image/image-2.jpg" },
        { url: "./media/image/image-3.jpg" },
        { url: "./media/image/image-4.jpg" },
        { url: "./media/image/image-5.jpg" },
        { url: "./media/image/image-6.jpg" },
        { url: "./media/image/image-7.jpg" },
        { url: "./media/image/image-8.jpg" },
      ],
      videos: [
        { url: "./media/video/video-1.mp4" },
        { url: "./media/video/video-2.mp4" },
        { url: "./media/video/video-3.mp4" },
        { url: "./media/video/video-4.mp4" },
      ],
    },
  };

  const $element = mrf.replaceChildren(
    mrf.createElement(/*html*/ `
        <div style-element-e7j47fw77dqcbdt>
            <header>
            
            <select tag-id="selectMedia">
              <option value="0">Imagenes</option>
              <option value="1">Videos</option>
            </select>
            
            </header>
            <div class="tag-jxfl57aakvo2rxh">
              <div tag-id="containerImage" class="container-images" style="display:none"></div>
              <div tag-id="containerVideo" class="container-images" style="display:none"></div>
            </div>

            <div tag-id="fullscreenImage" class="position-fixed-full tag-07ced5hs0pmx06g" style="display:none">
              <div class="tag-yngze0ckq4nx2nh">
                <div class="tag-gcdma84u984x2b5">
                  <img tag-id="image" src="./media/image/image-1.jpg">
                </div>
                <div class="tag-1ffwvc9ta2z3zkt">
                  <p style="color:#fff">lksadjfkljasdklfjaskldfjkl</p>
                </div>
              </div>
            </div>

            <div tag-id="fullscreenVideo" class="position-fixed-full tag-07ced5hs0pmx06g" style="display:none">
              
              <div class="tag-1ffwvc9ta2z3zkt" style="display:none">
                <p style="color:#fff">lksadjfkljasdklfjaskldfjkl</p>
              </div>
            </div>

            <div class="tag-jyosjb8g5own4pz">
              <img tag-id="image" src="./media/image/image-1.jpg">
              <video tag-id="video" src="./media/video/video-1.mp4" controls controlsList="nodownload nofullscreen"></video>
            </div>
        </div>
    `),
    {}
  );

  const $elements = mrf.objectElement(
    $element.querySelectorAll("[tag-id]"),
    "tag-id",
    true
  );

  mrf.event($elements.selectMedia, "change", () => {
    const optionValue = $elements.selectMedia.value;

    if (optionValue == 0) {
      $elements.containerImage.style.display = "";
      $elements.containerVideo.style.display = "none";

      if ($elements.containerImage.innerHTML == "") {
        $elements.containerImage.innerHTML = myVal.values.images
          .map(
            (image) => /*html*/ `
              <div class="images" data-fullscreen>
                <img src="${image.url}">
              </div>
            `
          )
          .join("");
      }
    }

    if (optionValue == 1) {
      $elements.containerImage.style.display = "none";
      $elements.containerVideo.style.display = "";

      if ($elements.containerVideo.innerHTML == "") {
        $elements.containerVideo.innerHTML = myVal.values.videos
          .map(
            (image) => /*html*/ `
              <div class="images" data-fullscreen>
                <video src="${image.url}"></video>
              </div>
            `
          )
          .join("");
      }
    }
  });

  mrf.event($elements.containerImage, "click", (e) => {
    const $img = e.target.closest("img");
    if ($img) {
      $elements.image.src = $img.src;
      $elements.image.requestFullscreen();
      return;
    }
  });

  mrf.event($elements.containerVideo, "click", (e) => {
    const $video = e.target.closest("video");
    if ($video) {
      $elements.video.src = $video.src;
      $elements.video.requestFullscreen();
      return;
    }
  });

  $elements.selectMedia.dispatchEvent(new Event("change"));

  return $element;
};

const countdownWithYear = (totalSeconds) => {
  const secondsInMinute = 60;
  const secondsInHour = 60 * secondsInMinute;
  const secondsInDay = 24 * secondsInHour;
  const secondsInYear = 365 * secondsInDay;

  const year = Math.floor(totalSeconds / secondsInYear);
  totalSeconds %= secondsInYear;

  const day = Math.floor(totalSeconds / secondsInDay);
  totalSeconds %= secondsInDay;

  const hour = Math.floor(totalSeconds / secondsInHour);
  totalSeconds %= secondsInHour;

  const minute = Math.floor(totalSeconds / secondsInMinute);
  const second = totalSeconds % secondsInMinute;

  return {
    year: year,
    day: day,
    hour: hour,
    minute: minute,
    second: second,
  };
};

const countLeapYearsInRange = (startDateStr, endDateStr) => {
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);
  let count = 0;

  for (
    let year = startDate.getFullYear();
    year <= endDate.getFullYear();
    year++
  ) {
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      const feb29 = new Date(`${year}-02-29`);
      if (startDate <= feb29 && endDate >= feb29) {
        count++;
      }
    }
  }

  return count;
};

var pagesTime = () => {
  const mrf = window.myResourceFunction;

  const myApp = window.dataApp;

  const myVal = {
    functions: {},
    intervals: {
      countdown: null,
    },
  };

  const $element = mrf.createElement(/*html*/ `
      <div style-element-iguvi846p6e9240>
        <div class="tag-ux4aa50npfaodo9">
          <div class="tag_n2twv204n2lth03">
            <h2 tag-id="tagYear">0</h2>
            <span>años</span>
          </div>
          <div class="tag_yhcssxt3v8hytwu">
            <h2 tag-id="tagDay">0</h2>
            <span>dias</span>
          </div>
          <div class="tag_n2twv204n2lth03">
            <h2 tag-id="tagHour">0</h2>
            <span>horas</span>
          </div>
          <div class="tag_yhcssxt3v8hytwu">
            <h2 tag-id="tagMinute">0</h2>
            <span>minutos</span>
          </div>
          <div class="tag_n2twv204n2lth03">
            <h2 tag-id="tagSecond">0</h2>
            <span>segundos</span>
          </div>
        </div>
      </div>
  `);

  const $elements = mrf.objectElement(
    $element.querySelectorAll("[tag-id]"),
    "tag-id",
    true
  );

  const countdown = () => {
    const time1 = new Date("2004/05/19");
    const time2 = new Date();

    const day = countLeapYearsInRange(time1, time2) * 86_400;

    const seconds =
      parseInt(time2.getTime() / 1000) - parseInt(time1.getTime() / 1000) - day;

    const resultado = countdownWithYear(seconds);

    $elements.tagYear.innerText = resultado.year;
    $elements.tagDay.innerText = resultado.day;
    $elements.tagHour.innerText = resultado.hour;
    $elements.tagMinute.innerText = resultado.minute;
    $elements.tagSecond.innerText = resultado.second;
  };

  myVal.intervals.countdown = setInterval(countdown, 1000);
  countdown();

  mrf.event(
    $element,
    "_unmounting",
    () => {
      clearInterval(myVal.intervals.countdown);
    },
    { once: true }
  );

  myApp.elements.metaThemeColor.setAttribute("content", "#000000");
  document.body.style.background = "#000000";

  document.documentElement.style.setProperty(
    "--app-color-svg-navigation",
    "#f8378e"
  );

  console.log(countLeapYearsInRange("2004/03/19", new Date()));

  return $element;
};

var pagesGallery = () => {
  const mrf = window.myResourceFunction;

  const myApp = window.dataApp;

 
  const messages = {
    goChorrillos: `
    No hay mucho que pueda decir sobre este dia, ademas de lo nervioso que me encontraba, primera vez visitando chorrillos, literalmente al otro opuesto en donde vivo, el regalo que recibiste, por cierto, tu hermana estaba hablando contigo, nerviosos andabamos, pero fue bueno... ella no te envio una foto mia pero yo te lo envio
    `,
    final: `
    Nosotros, obviamente teníamos que estar todos, bueno, quiero decirte que tienes unos ojos muy, pero muy hermosos, son demasiado lindos.

    me mencionaste que la u te tiene muy ocupada, todo eso es un esfuerzo que estas llevando, con el tiempo veras el resultado de todo ello, en ocasiones parecerá difícil hacerlo, pero en un futuro lo veras de una manera distinta y veras que si pudiste y que valió la pena, yo creo en que eres capaz de hacer muchas cosas, eres buena en lo que haces y lo que te propones.

    te quiero mucho mi angel, Feliz cumpleaños.
    `,
  };

  const $element = mrf.replaceChildren(
    mrf.createElement(/*html*/ `
        <div style-element-f2z7ffst1td05ws>
            <div tag-id="gallery" class="container-items">

              <div class="tag_0upftdjlbpj8rk7">

                <div class="tag_5lziqqw05fezv3i">

                  <div class="tag_le7zyr26br46x56">
                    <img src="./media/image/image-3.jpg">
                  </div>
                  <div class="tag_le7zyr26br46x56">
                    <img src="./media/image/image-7.jpg">
                  </div>
                  <div class="tag_le7zyr26br46x56">
                    <img src="./media/image/image-8.jpg">
                  </div>
                  <div class="tag_le7zyr26br46x56">
                    <img src="./media/image/image-9.jpg">
                  </div>
                
                </div>
                <div class="tag_3iw4ejir6sovwel">
                  <p style="line-height:2.1">Me gustaron mucho estas fotos, en algun momento me gustaria que tengamos unas fotos asi, Seria muy lindo</p>
                </div>

              </div>

              <!-- other -->

              <div class="tag_0upftdjlbpj8rk7">

                <div class="tag_5lziqqw05fezv3i">

                  <div class="tag_le7zyr26br46x56">
                    <img src="./media/image/image-5.jpg">
                  </div>
                  <div class="tag_le7zyr26br46x56">
                    <img src="./media/image/image-6.jpg">
                  </div>
                  <div class="tag_le7zyr26br46x56">
                    <img src="./media/image/image-10.jpg">
                  </div>
                 <div class="tag_le7zyr26br46x56">
                    <img src="./media/image/image-13.jpg">
                  </div>
                
                </div>
                <div class="tag_3iw4ejir6sovwel">
                  <p style="line-height:2.1">${messages.goChorrillos}</p>
                </div>

              </div>

              <!-- other -->

              <div class="tag_0upftdjlbpj8rk7">

                <div class="tag_5lziqqw05fezv3i">

                  <div class="tag_le7zyr26br46x56">
                    <video src="https://storage.vniox.com/uuid-0196e625-b6e0-77c7-a080-16197237c06b/videos/video-3.mp4"></video>
                  </div>
                  <div class="tag_le7zyr26br46x56">
                    <video src="https://storage.vniox.com/uuid-0196e625-b6e0-77c7-a080-16197237c06b/videos/video-4.mp4"></video>
                  </div>
                
                </div>
                <div class="tag_3iw4ejir6sovwel">
                  <p style="line-height:2.1">Te comparto estos video, fue cuando fui a chancay, recuerdo que no estabamos hablando en ese tiempo, pero estabas en mis pensamientos, y solo podia pensar en que hariamos si estuvieramos juntos</p>
                </div>

              </div>

              <!-- other -->

              <div class="tag_0upftdjlbpj8rk7">

                <div class="tag_5lziqqw05fezv3i">

                  <div class="tag_le7zyr26br46x56">
                    <img src="./media/image/image-1.jpg">
                  </div>
                  <div class="tag_le7zyr26br46x56">
                    <img src="./media/image/image-4.jpg">
                  </div>
                
                </div>
                <div class="tag_3iw4ejir6sovwel">
                  <p style="line-height:2.1">Sopa de letras y un paisaje ♥</p>
                </div>

              </div>

              <!-- other -->

              <div class="tag_0upftdjlbpj8rk7">

                <div class="tag_5lziqqw05fezv3i">

                  <div class="tag_le7zyr26br46x56">
                    <img src="./media/image/image-11.jpg">
                  </div>
                  <div class="tag_le7zyr26br46x56">
                    <img src="./media/image/image-12.jpg">
                  </div>
                
                </div>
                <div class="tag_3iw4ejir6sovwel">
                  <p style="line-height:2.1">Powerless y tulipanes</p>
                </div>

              </div>

              <!-- other -->

              <div class="tag_0upftdjlbpj8rk7">

                <div class="tag_5lziqqw05fezv3i">

                  <div class="tag_le7zyr26br46x56">
                    <video src="https://storage.vniox.com/uuid-0196e625-b6e0-77c7-a080-16197237c06b/videos/video-5.mp4"></video>
                  </div>

                  <div class="tag_le7zyr26br46x56">
                    <video src="https://storage.vniox.com/uuid-0196e625-b6e0-77c7-a080-16197237c06b/videos/video-6.mp4"></video>
                  </div>
                
                </div>
                <div class="tag_3iw4ejir6sovwel">
                  <p style="line-height:2.1">Tú y Yo tenemos una cita, Okey ♥ ?</p>
                </div>

              </div>

              <!-- other -->

              <div class="tag_0upftdjlbpj8rk7">

                <div class="tag_5lziqqw05fezv3i">

                  <div class="tag_le7zyr26br46x56">
                    <img src="./media/image/image-20.jpg">
                  </div>
                  <div class="tag_le7zyr26br46x56">
                    <img src="./media/image/image-15.jpg">
                  </div>
                  <div class="tag_le7zyr26br46x56">
                    <img src="./media/image/image-16.jpg">
                  </div>
                  <div class="tag_le7zyr26br46x56">
                    <img src="./media/image/image-17.jpg">
                  </div>

                  <div class="tag_le7zyr26br46x56">
                    <img src="./media/image/image-18.jpg">
                  </div>
                  <div class="tag_le7zyr26br46x56">
                    <img src="./media/image/image-19.jpg">
                  </div>
                  <div class="tag_le7zyr26br46x56" style="grid-column:1/-1">
                    <img src="./media/image/image-14.jpg">
                  </div>
                
                </div>
                <div class="tag_3iw4ejir6sovwel">
                  <p style="line-height:2.1">Nuestro Juegos </p>
                </div>

              </div>

              <!-- other -->

              <div class="tag_0upftdjlbpj8rk7">

                <div class="tag_5lziqqw05fezv3i">

                  <div class="tag_le7zyr26br46x56">
                    <img src="./media/image/image-21.jpg">
                  </div>
                  <div class="tag_le7zyr26br46x56">
                    <img src="./media/image/image-22.jpg">
                  </div>
                  <div class="tag_le7zyr26br46x56">
                    <img src="./media/image/image-23.jpg">
                  </div>
                  <div class="tag_le7zyr26br46x56">
                    <img src="./media/image/image-24.jpg">
                  </div>
                
                </div>
                <div class="tag_3iw4ejir6sovwel">
                  <p style="line-height:2.1">${messages.final}</p>
                </div>

              </div>

            </div>


            <div class="tag_iwzfvaadjndwsd2">
              <img tag-id="image" src="">
              <video tag-id="video" src="" controls controlsList="nodownload"></video>
            </div>
        </div>
    `),
    {}
  );

  const $elements = mrf.objectElement(
    $element.querySelectorAll("[tag-id]"),
    "tag-id",
    true
  );

  mrf.event($elements.gallery, "click", (e) => {
    const $img = e.target.closest("img");
    const $video = e.target.closest("video");

    if ($img) {
      $elements.image.src = $img.src;
      $elements.image.requestFullscreen();
    }

    if ($video) {
      $elements.video.src = $video.src;
      $elements.video.requestFullscreen();
    }
  });

  myApp.elements.metaThemeColor.setAttribute("content", "#F7F1EA");
  document.body.style.background = "#F7F1EA";
  document.documentElement.style.setProperty(
    "--app-color-svg-navigation",
    "#000000"
  );

  return $element;
};

// import pagesVideo from "../pages/pagesVideo";
// import favourite from "../pages/favourite";

var routes = () => {
  const myApp = window.dataApp;
  const myVal = {
    elements: {
      last: null,
    },
    val: {
      routes: [],
    },
    current: null,
    customEvents: {
      _mounted: new CustomEvent("_mounted"),
      _unmounted: new CustomEvent("_unmounted"),
      _mounting: new CustomEvent("_mounting"),
      _unmounting: new CustomEvent("_unmounting"),
    },
  };

  const routes = [
    { hash: "/", element: inicio },
    { hash: "/greet", element: pagesGreet },
    // { hash: "/audio", element: pagesAudio },
    { hash: "/image", element: pagesImage },
    { hash: "/time", element: pagesTime },
    { hash: "/gallery", element: pagesGallery },
    // { hash: "/video", element: pagesVideo },
  ];

  myApp.routes.set("hash", routes);

  addEventListener("hashchange", () => {
    if (myVal.current instanceof Node) {
      myVal.current.dispatchEvent(myVal.customEvents._unmounting);
      $element.innerHTML = "";
      myVal.current.dispatchEvent(myVal.customEvents._unmounted);
    }

    const get = myApp.routes.get(location.hash.slice(1));
    myVal.current = get.data.element();
    $element.innerHTML = "";

    if (myVal.current instanceof Node) {
      myVal.current.dispatchEvent(myVal.customEvents._mounting);
      $element.append(myVal.current);
      myVal.current.dispatchEvent(myVal.customEvents._mounted);
    }
  });

  //myApp.signals

  const $element = document.createElement("div");
  return $element;
};

var theme = () => {
  const myApp = window.dataApp;
  const myVal = {
    theme: localStorage.getItem("app-theme"),
    themes: {
      dark: {
        "--app-color-background": "#000000",
        "--app-color-background-second": "#000000",
        "--app-color-background-ii": "#000000",
        "--app-color-background-transparent": "rgb(255 255 255 / 0.1)",
        "--app-color-letter": "#ffffff",
        "--app-color-letter-second": "#ffffff",
        "--app-color-letter-ii": "#ffffff",
        "--app-color-item": "#1A1A1A",
        "--app-color-item-second": "#1A1A1A",
        "--app-color-item-ii": "#1A1A1A",
        "--app-color-item-third": "#1A1A1A",
        "--app-color-item-iii": "#1A1A1A",
      },
      light: {
        "--app-color-background": "#FFFFFF",
        "--app-color-background-second": "#FFFFFF",
        "--app-color-background-ii": "#FFFFFF",
        "--app-color-background-transparent": "rgb(0 0 0 / 0.1)",
        "--app-color-letter": "#000000",
        "--app-color-letter-second": "#ffffff",
        "--app-color-letter-ii": "#ffffff",
        "--app-color-item": "#F7F7F7",
        "--app-color-item-second": "#000000",
        "--app-color-item-ii": "#000000",
        "--app-color-item-third": "#F7F7F7",
        "--app-color-item-iii": "#F7F7F7",
      },
      system: null,
    },
  };

  myApp.signal.on("theme", (theme_) => {
    const theme = ((theme) => {
      if (theme == "light") return myVal.themes.light;
      if (theme == "dark") return myVal.themes.dark;
      if (theme == "system") {
        if (window.matchMedia("(prefers-color-scheme: light)").matches) {
          return myVal.themes.light;
        }

        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          return myVal.themes.dark;
        }
      }

      return myVal.themes.light;
    })(theme_);

    Object.entries(theme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });

    myApp.elements.metaThemeColor.setAttribute(
      "content",
      theme["--app-color-background"]
    );

    localStorage.setItem("app-theme", theme_);
  });

  myApp.signal.dispatch("theme", myVal.theme);

  return document.createTextNode("");
};

addEventListener("contextmenu", (e) => {
  if (e.target.getAttribute("data-allow-contextmenu") == null) {
    e.preventDefault();
  }
});

addEventListener("DOMContentLoaded", () => {
  const mrf = window.myResourceFunction;
 
  window.dataApp = dataApp();

  document.getElementById("app").append(
    ...mrf.replaceChildren(
      mrf.createElement(/*html*/ `
        <div>
            <app-theme></app-theme>
            <div class="container">
                <navigate-main></navigate-main>
                <div class="container" style="flex-direction:column">
                    <routes class="routes"></routes>
                    <footer-player></footer-player>
                    <bar-upload></bar-upload>
                </div>
            </div>
            <navigate-bottom></navigate-bottom>
        </div>
      `),
      {
        appTheme: theme(),
        navigateMain: navigate(),
        navigateBottom: navigateBottom(),
        routes: routes(),
        footerPlayer: footerPlayer(),
        barUpload: barUpload(),
      }
    ).childNodes
  );

  dispatchEvent(window.dataApp.customEvent.hashchange);
});

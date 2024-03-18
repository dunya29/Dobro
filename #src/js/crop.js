const cropAvaPopup = document.querySelector('.cropp-ava');
if (cropAvaPopup) {
  const uploadInput = document.querySelector('.file-form__ava');
  const inputPhoto = uploadInput.querySelector('#reg_file');
  const croppieContainer = cropAvaPopup.querySelector('#croppieContainer');
  const cropBtn = cropAvaPopup.querySelector('#cropBtn');
  const cropDestroy = cropAvaPopup.querySelector('#crop-destroy');
  const imgWrap = uploadInput.querySelector('.file-form__img');
  const avatarInput = uploadInput.querySelector('input[name="avatar"]');
  let croppieInstance
  const modal = document.querySelector('#cropp-ava');
  inputPhoto.addEventListener('change', event => {
    const file = event.target.files[0];
    if(!/image*/.test(file.type)) {
      showMessages('error', 'Неверный формат файла');
      inputPhoto.value='';
      return;
    }
    if(file.size > 2 * 1024 * 1024) {
      inputPhoto.value='';
      showMessages('error', 'Неверный размер файла');
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const imgUrl = reader.result;
      const img = new Image;
      img.src = imgUrl;
      img.onload = function(){
        if(img.width > 2056 || img.height > 2056) {
          inputPhoto.value='';
          showMessages('error', 'Размеры изображения больше разрешенных');
        } else {
		      if (croppieInstance) {
            croppieInstance.destroy();
          }
          modal.classList.add("open")
          croppieInstance = new Croppie(croppieContainer, {
            url: imgUrl,
            enableExif: true,
            viewport: {
              width: 200,
              height: 200,
              type: 'square'
            },
            boundary: {
              width: 400,
              height: 400
            }
          });
        }
      }
    };
  });
  cropBtn.addEventListener('click', () => {
    croppieInstance.result({
      type: 'blob',
      size: {
        width: 200,
        height: 200
      },
      format: 'jpeg',
      quality: 1,
      circle: false
    }).then(blob => {
      const croppedFile = new File([blob], 'croppedFile.jpg', {
        type: 'image/jpg',
        lastModified: Date.now()
      });
      const imgUrl = URL.createObjectURL(croppedFile);
      imgWrap.style.backgroundImage = `url(${imgUrl})`;
      modal.classList.remove("open")
      /* const formData = new FormData();
      formData.append('cropped', croppedFile);
      formData.append('original', inputPhoto.files[0]);
      avatarInput.value = '';
      $.ajax({
        // Hostname and port of the local server
        url: "/files/upload/avatar",
        // HTTP request type
        type: "POST",
        // Sending blob with our request
        data: formData,
        processData: false,
        contentType: false,
        dataType: 'json',
        success: function (response) {
            if(response.status) {
              const imgUrl = URL.createObjectURL(croppedFile);
              imgWrap.style.backgroundImage = `url(${imgUrl})`;
              avatarInput.value = response.file;
              showMessages('info', 'Файл загружен');
              modal.classList.remove("open")
            } else {
              inputPhoto.value='';
              showMessages('error', 'Не удалось загрузить файл');
              modal.classList.remove("open")
            }
        },
        error: function (e) {
            inputPhoto.value='';
            showMessages('error', 'Не удалось загрузить файл');
            modal.classList.remove("open")
        }
      }); */
    });
  });
  cropDestroy.addEventListener("click",() => modal.classList.remove("open"))
}
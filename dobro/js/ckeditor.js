ClassicEditor
.create( document.querySelector( '#col_desc' ), {
  language: 'ru',
  toolbar: ['bold', 'italic','numberedList', 'bulletedList','link', 'heading'],
})
.catch( error => {
    console.error( error );
} ); 

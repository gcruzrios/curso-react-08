import { fileUpload } from "../../helpers/fileUpload";
import cloudinary from 'cloudinary';

cloudinary.config({ 
    cloud_name: 'geoinn', 
    api_key: '786136948958384', 
    api_secret: 'kzW16iPb-2HrqibRF3Pt4s865h8' 
  });



describe('Pruebas en fileUpload', () => {


    test('debe de cargar un archivo y retornar el URL ', async () => {

        const resp = await fetch('https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png');

        const blob = await resp.blob();

        const file = new File([blob], 'foto.png');

        const url = await fileUpload(file);

        expect (typeof url).toBe('string');

        //Borrar imagen por ID

        const segments = url.split('/');
        //console.log(segments);

        const imagenId = segments[segments.length-1 ].replace('.png', '');

        //console.log(imagenId);
          

        await cloudinary.v2.api.delete_resources(imagenId, {}, ()=>{
            //done();
        });

        
        //console.log (url);

        
    })

    test('debe de retornar el Error ', async () => {

        

        const file = new File([], 'foto.png');

        const url = await fileUpload(file);

        expect  (url).toBe(null);
        
        //console.log (url);

        
    },20000)
    
})

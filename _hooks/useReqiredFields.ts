
const useRequiredFields = (div?:string) => {

  const validateFields = (fields: any[], parent_id?:string) => {
    for (let i = 0; i < fields.length; i++) {
      const fieldName = fields[i];
     
      if (fieldName) {
        let fieldElement = document.querySelector(`[name="${fieldName}"]`) as HTMLInputElement;
        if(parent_id && parent_id!=""){
          fieldElement = document.querySelector(`#${parent_id} [name="${fieldName}"]`) as HTMLInputElement;
        }

        if (fieldElement) {
          const fieldValue = fieldElement.value;

          if (!fieldValue) { 
            // const top = fieldElement.getBoundingClientRect().top + window.scrollY - 150; 
            // const top = fieldElement.offsetTop - 150; 
            let top = 0; 
            const parentElement = fieldElement.closest('#parent_id') as HTMLElement;  
            if (parentElement) {
              top = parentElement.offsetTop - 150; 
              parentElement.style.border = '2px solid red';
            } 
         
            const removeErrorClass = () => {
              if (parentElement) {
                parentElement.style.border = '';
              }
              fieldElement.removeEventListener('click', removeErrorClass);
            };

            fieldElement.addEventListener('click', removeErrorClass);
            // window.scrollTo({ top, behavior: 'smooth' });
            if(div && div !=""){
              const divElement = document.getElementById(div) as HTMLDivElement;
              if(divElement){
                divElement .scrollTo({ top, behavior: 'smooth' });
              }else {
                window.scrollTo({ top, behavior: 'smooth' });
              }
            }else {
              window.scrollTo({ top, behavior: 'smooth' });
            }

            setTimeout(() => {
              if (parentElement) {
                parentElement.style.border = '';
              }
            }, 7000);

            return false;
          }
        }
      }
    }
    return true;
  };

  const errorFields = (fields: any[]) => {
    for (let i = 0; i < fields.length; i++) {
      const fieldName = fields[i];

      if (fieldName) {
        const fieldElement = document.querySelector(`[name="${fieldName}"]`) as HTMLInputElement; 
        if (fieldElement) {
          const fieldValue = fieldElement.value;

            // const top = fieldElement.getBoundingClientRect().top + window.scrollY - 150; 
            // const top = fieldElement.offsetTop - 150; 
            let top = 0; 
            const parentElement = fieldElement.closest('#parent_id') as HTMLElement;
            if (parentElement) { 
              top = parentElement.offsetTop - 150; 
              parentElement.style.border = '2px solid red';
            }

            const removeErrorClass = () => {
              if (parentElement) {
                parentElement.style.border = '';
              }
              fieldElement.removeEventListener('click', removeErrorClass);
            };

            fieldElement.addEventListener('click', removeErrorClass);
            // window.scrollTo({ top, behavior: 'smooth' });
            if(div && div !=""){
              const divElement = document.getElementById(div) as HTMLDivElement;
              if(divElement){
                divElement .scrollTo({ top, behavior: 'smooth' });
              }else {
                window.scrollTo({ top, behavior: 'smooth' });
              }
            }else {
              window.scrollTo({ top, behavior: 'smooth' });
            }

            setTimeout(() => {
              if (parentElement) {
                parentElement.style.border = '';
              }
            }, 7000);

            return false; 
        }
      }
    }
    return true;
  };

  const flagSection = (sectionsId: string) => {
    if (sectionsId) {

      const removeErrorClass = () => {
          if (sectionElement) {
              sectionElement.style.border = '';
          }
          sectionElement.removeEventListener('click', removeErrorClass);
      };

      let top = 0;
      const sectionElement = document.getElementById(sectionsId) as HTMLElement;
      if (sectionElement) {
          top = sectionElement.offsetTop - 150;
          sectionElement.style.border = '2px solid red';
          sectionElement.addEventListener('click', removeErrorClass);
      }

      window.scrollTo({ top, behavior: 'smooth' });

      setTimeout(() => {
        if (sectionElement) {
          sectionElement.style.border = '';
        }
      }, 7000);
    }
  }

  return { validateFields, errorFields, flagSection };

}

export default useRequiredFields;
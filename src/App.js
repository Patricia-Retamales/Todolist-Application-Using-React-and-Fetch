import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';



const App = () => {
  const [frases, setFrases] = useState([]);
  const [frase, setFrase] = useState("");

  useEffect(() => {
    getFrases();
  }, []);

  useEffect(() => {
    agregarput();
    
  }, [frases]);



async function getFrases () {
  const resp = await fetch('http://assets.breatheco.de/apis/fake/todos/user/patricia', {
      method: "GET",

      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => {
        console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
        console.log(resp.status); // el código de estado = 200 o código = 400 etc.

        return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
      })
      .then(data => {
        let html = data.map(tarea => tarea.label);
        console.log(data);
        console.log(html);
        setFrases(html)
        //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
        //esto imprimirá en la consola el objeto exacto recibido del servidor
      })
      .catch(error => {
        //manejo de errores
        console.log(error);
      });



  }


  const eliminarfrases = indexfrases => {
    let newArray = frases.filter((item, indice) => indice !== indexfrases);

    setFrases(newArray);
    fetch('http://assets.breatheco.de/apis/fake/todos/user/patricia', {
      method: "PUT",
      body: JSON.stringify(
        frases.map(item => {
          return {
            label: item, done: true
          };
        })

      ),

      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => {
        console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
        console.log(resp.status); // el código de estado = 200 o código = 400 etc.

        return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
      })
      .then(data => {

        console.log(data);


        //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
        //esto imprimirá en la consola el objeto exacto recibido del servidor
      })
      .catch(error => {
        //manejo de errores
        console.log(error);
      });

  }
console.log(frases)

  const agregarFrases = event => {

    setFrase(event.target.value);
    console.log(frases)
    /* fetch('http://assets.breatheco.de/apis/fake/todos/user/patricia', {
      method: "PUT",
      body: JSON.stringify(
        frases.map(item => {
          return {
            label: item, done: false
          }
        })

      ),


      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => {
        console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
        console.log(resp.status); // el código de estado = 200 o código = 400 etc.

        return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
      })
      .then(data => {

        console.log(data);


        //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
        //esto imprimirá en la consola el objeto exacto recibido del servidor
      })
      .catch(error => {
        //manejo de errores
        console.log(error);
      }); */




  }

  const eliminarTodo = () => {
    setFrases([]);

    fetch('http://assets.breatheco.de/apis/fake/todos/user/patricia', {
      method: "DELETE",
      body: JSON.stringify(),
      headers: {
        "Content-Type": "application/json"

      }
    })
      .then(resp => {
        console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
        console.log(resp.status); // el código de estado = 200 o código = 400 etc.

        return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
      })
      .then(data => {
        setFrases([])
        //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
        //esto imprimirá en la consola el objeto exacto recibido del servidor
      })
      .catch(error => {
        //manejo de errores
        console.log(error);
      });



  }




  const agregarput = () => {
  fetch('https://assets.breatheco.de/apis/fake/todos/user/patricia', {
      method: "PUT",
      body: JSON.stringify(
        frases.map(item => {
          return {
            label: item, done: false
          }
        })

      ),


      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => {
        console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
        console.log(resp.status); // el código de estado = 200 o código = 400 etc.

        return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
      })
      .then(data => {

        console.log(data);


        //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
        //esto imprimirá en la consola el objeto exacto recibido del servidor
      })
      .catch(error => {
        //manejo de errores
        console.log(error);
      }); 


}





  function Agregaraqui(e) {
    console.log(Agregaraqui)


  }

  return (
    <div>
      <button className='buton'  onClick={() => { eliminarTodo() }}>Eliminar Todo</button>
      <form
        onSubmit={evento => {
          setFrases(frases.concat(frase));
          evento.preventDefault();
          setFrase("");
        }}>

        <input type="text" name="datos" value={frase} onChange={evento => { agregarFrases(evento) }} />

      </form>
<h1 className='titulo'> TODO LIST </h1>
      {frases.map((frase, index) => {
        return (
          <ul
            key={index}>
            {frase}
            <button onClick={() => { eliminarfrases(index) }}>
              Anular
            </button>

          </ul>

        );
      })}



    </div>

  );
}

export default App;
import * as React from 'react';

interface LocationInputProps {
    setCurrentLocation: (latitude: number, longitude: number) => void;
}

export class LocationInput extends React.Component<LocationInputProps>{
    render() {
        return (
            <form className='BikeLocator-locationInput' onSubmit={(event) => this.handleSubmit(event)}>
            <label>
              Latitude:
              <input type="text" name="latitude" />
            </label>
            <label>
              Longitude:
              <input type="text" name="longitude" />
            </label>
            <input type="submit" value="Submit" />
          </form>
        )
    }

    handleSubmit(event: any){
        event.preventDefault();

        const latitude = event.target[0].value;
        const longitude = event.target[1].value;
        this.props.setCurrentLocation(latitude, longitude);
        
    }

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setValues({
    //       ...values,
    //       [name]: value,
    //     });
    //   };
}
# Record-ID - Solo project, 8 days

[Link to deployed version](http://record-id-project.herokuapp.com/)

For my final project at General Assembly, we were tasked with creating a full-stack application with a Python and Django back-end, with a React front-end. I decided to take it on as a solo project as I wanted to test how well I could handle the larger workload of a full-stack app.

One of my biggest hobbies/interests is modern electronic music records, so I decided to create a project for browsing and adding records, each with their own artists and featuring links to listen and purchase the record. 

![Homepage](https://i.ibb.co/0Qf9D3n/Screenshot-2022-01-24-at-14-33-34.png)


## Brief 

- Full=stack application with a React front-end and Django back-end.
- Fully functional RESTful API with CRUD routes.
- Use at least one OneToMany and one ManyToMany relationship.
- Custom authentication (register/login) is optional for solo projects and a requirement for group projects.

## Technologies used

- React/JavaScript
- HTML
- CSS
- Bootstrap
- Django
- Django REST Framework
- Insomnia
- Cloudinary 
- Python
- Axios
- Git
- GitHub
- TablePlus
- React-router-dom
- React-select
- React-star-ratings
- React-player

## Getting started

- Once the repo has been forked/downloaded, open a terminal
- Enter ‘pipenv shell’ to enter the shell
- In a second terminal, enter ‘frontend’ 
- In both terminals, run ‘yarn’ to install all dependencies necessary
- Run 'yarn serve' in the back-end terminal 
- Run 'yarn start' in the front-end terminal
- In your browser, go to localhost:3000 (or 4000 depending on your computer)

## Planning Process

The main part of the planning process was creating an entity relationship diagram (using LucidChart) in order to map out the different models, what they would consist of, and the relationships between them.

![ERD](https://i.ibb.co/KWJcFR5/Screenshot-2022-01-24-at-14-35-28.png)



## The Build: Back-End

After this I began to build out the back-end using boilerplate Python/Django setup, installing the necessary files, such as Django REST Framework. Django’s inbuilt admin editor was extremely useful, allowing one to visualise adding items to the database much more easily and seeing how writing different relationships affects the models. TablePlus was used to view the data being added, as well as using Insomnia to test CRUD routes before creating the front-end. I created models for each different element, and used Django's 'include' feature to define routes for them within the API to make them accessible. Model features, such as the record's genre, required a list of options that can be selected, so I used Django's 'CHOICES' feature to be able to define the list to integrate into the feature.

```python
class Record(models.Model):

  RECORD_TYPES = (
    ('Single', 'Single Release'),
    ('EP', 'Extended Project'),
    ('LP', 'Long Play'),
    ('V/A', 'Artist Compilation')
  )

  RECORD_GENRES = (
    ('UKG', 'UKG'),
    ('Breaks', 'Breaks'),
    ('Jungle', 'Jungle'),
    ('House', 'House'),
    ('Drum and Bass', 'Drum and Bass'),
    ('Techno', 'Techno'),
    ('Dubstep', 'Dubstep'),
    ('Other', 'Other')
  )

  title = models.CharField(max_length=100, default=None)
  image = models.CharField(max_length=700, default=None)
  release_date = models.IntegerField(default=None)
  label = models.CharField(max_length=100, default=None)
  genre = models.CharField(max_length=100, choices=RECORD_GENRES, default=None)
  type_of_record = models.CharField(max_length=100, choices=RECORD_TYPES, default=None)
  is_vinyl_only = models.BooleanField(default=None)
  link = models.CharField(max_length=200, default=None)
  soundcloud_link = models.CharField(max_length=300, default=None)
  artists = models.ManyToManyField("artists.Artist")
  owner = models.ForeignKey(
    "jwt_auth.User",
    related_name = 'records',
    on_delete = models.CASCADE
  )

```

```python
from django.contrib import admin
from django.urls import path, include, re_path 
from .views import index 

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/records/', include('records.urls')),
    path('api/artists/', include('artists.urls')),
    path('api/auth/', include('jwt_auth.urls')),
    path('api/reviews/', include('reviews.urls')),
    path('api/favourites/', include('favourites.urls')),
    re_path(r'^.*$', index)
]
```
## The Build: Front-end

The index page, displaying all of the records in the database, uses an API request to set the necessary information to pieces of state which are then read using dot notation to display. This is then mapped through ti display each record as an individual 'card', a refactored component containing the styling and information necessary. 

```javascript
{records.map(record => {
      return (
            <div key={record.id} className='col mb-3'>
              <RecordCard key={record.id} {...record} />
            </div>
      )
})}
```
The index page also displays a random soundcloud clip of one of the records using 'react-player', which is set to a piece of state as a random record from the index.

```javascript
useEffect(() => {
    const chooseRandom = () => {
      const num = Math.floor(Math.random() * records.length)
      setRandomRec(records[num])
    }
    chooseRandom()
  }, [records])
```

I then built the individual record page to display the record's information, providing numerous external sources such as a purchase link and a soundcloud clip of the music using 'react-player'. The page shows the artists who are feature on the record, each providing a link to the individual artist page as well as having hover-activated triggers to display the artists name. I created a separate component for the displaying of the record's reviews, which also contains the functionality for authenticating a user in order to display the option to delete a review as long as they created it. I achieved this by acquiring the token from local storage and splitting it apart to reveal the payload. From this, the user's ID can be obtained to cross reference.

```javascript
useEffect(() => {
    const payload = getPayload()
    if (!payload) {
      setUserPayload('')
    } else {
      setUserPayload(payload.sub)
    }

  }, [])

  const handleDel = async (event) => {
    axios.delete(
      `/api/reviews/${event.target.id}/`,
      {
        headers: { Authorization: `Bearer ${getTokenFromLocalStorage()}` },
      }
    )
    window.location.reload()
  }
```

The 'register' form submits the form data entered by the user, updated using functions called by changing/editing the fields. A user submitting their own profile picture to their profile is also possible, which I built using Cloudinary. This software uploads the image to the Cloudinary database and generates a URL that the request uses to send in the post request to the database.

```javascript
const handleUpload = async event => {
    const data = new FormData()
    data.append('file', event.target.files[0])
    data.append('upload_preset', uploadPreset)
    const response = await axios.post(uploadUrl, data)
    handleImageUrl(response.data.url)
  }
```

The add record page, availible from the Navbar only when a user is logged in, allows a user to add a new record to the index and become displayed on the record page, as well as choosing the artists who created it via a drop down list created with ‘react-select’. I created the option to be able to also add a new artist by  clicking ‘add artist’ a modal appears with a new form, similarly adding an artist profile to the artist index. This was built using bootstrap’s inbuilt code, with the ‘Modal’ tags used to set the different aspects.

```javascript
<>
      <Modal.Header closeButton>
        <Modal.Title>Add an Artist</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleArtistSubmit}>

          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              className={`${errors.name ? 'border-danger' : ''}`}
              name='name'
              placeholder='Artist Name'
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Profile Picture</Form.Label>
            <ImageUploadField
              className={`${errors.image ? 'border-danger' : ''}`}
              value={formData.image}
              name='image'
              handleImageUrl={handleImageUrl}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Social Media Link</Form.Label>
            <Form.Control
              className={`${errors.social_link ? 'border-danger' : ''}`}
              name='social_link'
              placeholder='URL'
              value={formData.social_link}
              onChange={handleChange}
            />
          </Form.Group>

          <Button type='submit' variant='primary' onClick={handleClose} style={{ marginTop: '20px' }}>
            Submit
          </Button>

        </Form>
      </Modal.Body>
    </>
``` 



## App user story

Without being logged into an account, a user can browse the database of records and artists. 

![record and artist index](https://i.ibb.co/TYnWrrz/Screenshot-2022-01-24-at-14-36-37.png)

From this page a user can browse to the individual page of a record to display information such as genre and its purchase link. The ‘react-player’ package is also utilised here, displaying the soundcloud link in the back-end of the record model. I also used Bootstrap’s ‘overlayer triggers’ to display artist names when hovering over the icons. Clicking on an artist page (from the record itself or the artist index page) leads to a page displaying their picture and a youtube video of a recent set. 

![Record show page](https://i.ibb.co/F8SNQN9/Screenshot-2022-01-24-at-14-37-28.png)


When a user is logged into their account, they can leave reviews for the record as well as having the ability to delete reviews they have created themselves. Authentication also gives the user ability to ‘favourite’ a record which will then appear on their profile page. 

![profile page](https://i.ibb.co/5kP4GLh/Screenshot-2022-01-24-at-14-38-15.png)



Their profile page displays the information they entered when creating an account (the profile picture shown is a default given when no picture is added), their favourite records, and any records the user has added themselves, an option which appears in the navbar only when a user is logged into their account. This allows the user to see their own collection separate from the larger number of items collated in the overall index. I used Cloudinary to be able to upload photos to a server to then be used and displayed on the page.


![add record form](https://i.ibb.co/mbyGMXJ/Screenshot-2022-01-24-at-14-38-56.png)

![add artist form](https://i.ibb.co/StdZtzS/Screenshot-2022-01-24-at-14-40-05.png)



## Featured section of code: using Bootstrap

During the immersive course, our class was taught how to use the CSS framework Bulma, helping me to understand reading documentation and using new formats of styling. For this project, I wanted to challenge myself by using the framework Bootstrap, using documentation to walk myself through creating the different sections, forms and styling refinements such as trigger overlays. 

One of the main reasons I chose Bootstrap was because of its extremely-customisable carousel. I wanted to use this to create a slideshow of a few records, and refine it to be as attractive as possible.

```javascript
        <div>
          {theFewRecords !== [] ?
            <>
              <Carousel id='home-carousel' variant="dark" pause='hover'>
                {theFewRecords.map(rec => {
                  return (
                    <Carousel.Item className='carousel-item' key={rec.id} style={{
                      textAlign: 'center',
                      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${rec.image})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'cover',
                      paddingTop: '30px',
                    }}>
                      <HomeCarousel {...rec} />
                    </Carousel.Item>
                  )
                })}
              </Carousel>
            </>

            :

            <>
              {hasError ?
                <h1>error</h1> : <h1>loading</h1>
              }
            </>
          }
        </div>
```
```javascript
const HomeCarousel = ({ id, image, title }) => {

  return (
    <Link to={`/records/${id}`} >
      <Figure>
        <Figure.Image
          src={image}
          alt={`${title} Cover Art`}
          id='record-single-pic'
          style={{ boxShadow: '0 4px 16px 0 rgba(0,0,0, 0.8', borderRadius: '50%' }}
        />
      </Figure>
      <Carousel.Caption style={{ 
        top: '0',
        bottom: 'auto',
        color: 'white',
        backgroundColor: 'rgba(0,0,0, 0.4',
        borderRadius: '20px',
      }}>
        {title}
      </Carousel.Caption>
    </Link>
  )

}
export default HomeCarousel
```



After defining a new piece of state for the first 6 of the records in the index, I used a map function to create a carousel item for each one. It has also been refactored to contain a separate component with the circular styling of the record image as well as the caption. 

## Known bugs

- Duplicates of the same favourite can be added.
- An extra feature that could have been added would have been for the favourite button on the record page to disable if the record is added already.
- The blue hyperlink lines underneath each item on the index page wouldn't seem to disappear with the necessary styling.
- The Youtube video on each artist page is the same as I ran out of time before entering a specific link for each artist.
- The website isn’t fully mobile-responsive which would have been refined with more time.

## Wins and take-aways

Learning a new set of documentation with Bootstrap was extremely helpful as I gained skills in being able to learn a new framework whilst refining my ability to read documentation. I feel learning a new style of coding helps to keep my mind fresh and consistently makes me feel like I’ve touched the tip of the iceberg when it comes to software engineering. 

A big challenge for me was time management. I feel if I had the understanding I have now, I would have created the project in a different way (as described above), allowing me to add more features and explore the possibilities of creating an app in a different approach. However, this project has therefore been a great learning experience and I look forward to creating another one of greater scope in the future.  

## Future version/features

Looking back over the project, I decided it would have been a better approach to have not created an artist page and instead have made the app as an E-Commerce service, allowing users to add records to their cart. This would have been a more challenging and learnful experience, as I would have had to learn another set of documentation and create an app that had a central idea more new to me.





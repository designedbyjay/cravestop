    express = require 'express'
    app = express()
    app.set 'jsonp callback', true
    mongoose = require 'mongoose'
    request = require 'request'
    $ = require 'jquery'
    fs = require 'fs'

    mongoose.connect process.env.MONGOHQ_URL or 'mongodb://127.0.0.1/sampledb'

    Schema = mongoose.Schema
    ObjectId = Schema.ObjectID

    Client = new Schema
      clientName:
        type: String
        trim: true
      project: [Project]

    PreviewLink = new Schema
      linkText:# {{{
        type: String
        trim: true
      url:
        type: String
        trim: true# }}}

    Media = new Schema
      format: String# {{{
      executionType: String
      width: Number
      height: Number
      description: String
      title: String
      link: String
      src: String
      useInCarousel: Boolean# }}}

    Award = new Schema
      name: String# {{{
      desc: String
      url: String
      year: String
      stamp: String# }}}

    Tag = new Schema
      tag: String
      project: [Project]


    WorkCat = new Schema
      category: String
      project:[Project]

    ServiceCat = new Schema
      category: String
      project:[Project]

    Project = new Schema
      projectTitle:# {{{
        type: String
        required: true
        trim: true
      clients: [Client]
      previewLinks: [PreviewLink]
      description: String
      short: String
      launched: String
      featured: String
      sticky: String
      inLab: String
      media: [Media]
      awards: [Award]
      tags: [Tag]
      workCat: [WorkCat]
      serviceCat: [ServiceCat]# }}}


    Project = mongoose.model 'Project', Project
    Client = mongoose.model 'Client', Client
    Award = mongoose.model 'Award', Award
    Media = mongoose.model 'Media', Media
    Tag = mongoose.model 'Tag', Tag
    WorkCat = mongoose.model 'WorkCat', WorkCat
    ServiceCat = mongoose.model 'ServiceCat', ServiceCat


    app.set 'view engine', 'ejs'
    app.set 'views', __dirname + '/views'
    app.use express.bodyParser()
    app.use express.static __dirname + '/public'

    `
    // Array Remove - By John Resig (MIT Licensed)
    Array.prototype.remove = function(from, to) {
      var rest = this.slice((to || from) + 1 || this.length);
      this.length = from < 0 ? this.length + from : from;
      return this.push.apply(this, rest);
    };
    `

    getAll = []# {{{
    getAll.projects = (req,res) ->
      res.render 'layout.jade', {type:'foo'}

    getAll.addProject = (req,res) ->
      res.render 'add-project.ejs'

    getAll.addClient = (req,res) ->
      res.render 'add-client.ejs'

    getAll.viewProject =  (req,res) ->
      res.render 'layout.ejs'

    app.get '/all', getAll.projects
# }}}

    k5app = []
    k5app.all = (req,res) ->
      Project.find {},(error, data) ->
        res.jsonp(data)

    k5app.remove = (req,res) ->
      Project.find({ _id: req.params.id }).remove()
      res.send 'done'

    k5app.removetag = (req,res) ->
      tag.find({ _id: req.params.id }).remove()
      res.send 'done'

    k5app.removetag = (req,res) ->
      tag.find({ _id: req.params.id }).remove()
      res.send 'done'

    k5app.removeWorkCat = (req,res) ->
      WorkCat.find({ _id: req.params.id }).remove()
      res.send 'done'


    k5app.removeMedia = (req,res) ->
      Project.findById req.params.id, (error,project) -># {{{
        project.media = []
        project.save (error, data) ->
          if(error)
            console.log 'unable to update'
            res.json(error)
          else
            res.json data# }}}

    k5app.delLink = (req,res) ->
      Project.findById req.params.id, (error,project) -># {{{
        project.previewLinks = []
        project.save (error, data) ->
          if(error)
            console.log 'unable to update'
            res.json(error)
          else
            res.json data# }}}


    k5app.removeAwards = (req,res) ->
      Project.findById req.params.id, (error,project) -># {{{
        project.awards = []
        project.save (error, data) ->
          if(error)
            console.log 'unable to update'
            res.json(error)
          else
            res.json data# }}}


    k5app.allMedia = (req,res) ->
      Media.find {},(error, data) ->
        res.json(data)

    k5app.removeServiceCat = (req,res) ->
      ServiceCat.find({ _id: req.params.id }).remove()
      res.send 'done'

    k5app.editProject = (req,res) ->
      res.render 'add-project.ejs'

    k5app.listClient = (req,res) ->
      res.render 'list-client.ejs'

    k5app.listProject = (req,res) ->
      res.render 'list-project.ejs'

    k5app.getProject = (req,res) ->
      Project.find {_id: req.params.id }, (error,data) ->
        res.json data

    k5app.getAllClients = (req,res) ->
      Client.find {}, (error,data) ->
        res.jsonp data

    k5app.getSingleClient = (req,res) ->
      Client.findOne {_id: req.params.id }, (error,data) ->
        res.json data

    k5app.getClient = (req,res) ->
      Project.find {_id: req.params.id }, (error,data) ->
        res.json(data[0].clients)

    k5app.removeClient = (req,res) ->
      Client.find({ _id: req.params.id }).remove()
      res.send 'done'

    k5app.removeAllClient = (req,res) ->
      Client.find().remove()
      res.send 'done'

    k5app.getPreview = (req,res) ->
      Project.find {_id: req.params.id }, (error,data) ->
        res.jsonp(data[0].previewLinks)

    k5app.getAward = (req,res) ->
      Project.find {_id: req.params.id }, (error,data) ->
        res.jsonp(data[0].awards)

    k5app.getMedia = (req,res) ->
      Project.find {_id: req.params.id }, (error,data) ->
        res.jsonp(data[0].media)


    k5app.getTags = (req,res) ->
      Tag.find {}, (error,data) ->
        res.jsonp data

    k5app.addTags = (req,res) ->
      tag_data =# {{{
        tag: req.params.tag
        project: req.query.project
      tag = new Tag(tag_data)

      tag = new Tag()
      Tag.findOne {tag: req.params.tag}, (error,project) ->
        if(error)
          res.json(error)
        else if(tag == null)
          res.json('no such user!')
        else
          tag.project.push('foo')
          console.log tag
          tag.save (error, data) ->
            if(error)
              res.json error
            else
              res.json data
          # }}}


    k5app.removeTags = (req,res) ->
      Tag.find({ project: req.params.project }).remove()
      res.send 'done'


    k5app.removeAllTags = (req,res) ->
      Tag.find().remove()
      res.send 'done'

    k5app.removeAllProjects = (req,res) ->
      Project.find().remove()
      res.send 'done'

    k5app.getWorkCat = (req,res) ->
      WorkCat.find {}, (error,data) ->
        res.jsonp(data)


    k5app.addWorkCat = (req,res) ->
      workCat_data =# {{{
        category: req.params.category

      workCat = new WorkCat(workCat_data)
      workCat.save (error, data) ->
        if(error)
          res.json error
        else
          res.json data# }}}

    k5app.addWorkCatProject = (req,res) ->
      workCat = new WorkCat()# {{{
      WorkCat.findOne {_id: req.params.id}, (error,workCat) ->
        if(error)
          res.json(error)
        else if(workCat == null)
          res.json('no such category')
        else
          workCat.project.push({ projectId: req.query.projectId })
          workCat.save (error, data) ->
            if(error)
              res.json(error)
            else
              res.json(data)
          # }}}

    k5app.getServiceCat = (req,res) ->
      ServiceCat.find {}, (error,data) ->
        res.jsonp(data)

    k5app.updateProj = (req,res) ->
      Project.findById req.params.id, (error,project) -># {{{
        project.projectTitle = req.params.projectTitle
        project.description = req.query.description
        project.short = req.query.short
        project.launched = req.query.launched
        project.featured = req.query.featured
        project.sticky = req.query.sticky
        project.inLab = req.query.inLab
        project.save (error, data) ->
          if(error)
            console.log 'unable to update'
            res.json(error)
          else
            res.json data# }}}

    k5app.addproj = (req,res) ->
      project_data =# {{{
        projectTitle: req.params.projectTitle
        description: req.query.description
        short: req.query.short
        launched: req.query.launched
        featured: req.query.featured
        sticky: req.query.sticky
        inLab: req.query.inLab

      project = new Project(project_data)
      project.save (error, data) ->
        if(error)
          res.json error
        else
          res.json data# }}}


    k5app.createPreview = (req,res) ->
      project = new Project()# {{{
      Project.findOne {_id: req.params.projectId}, (error,project) ->
        if(error)
          res.json(error)
        else if(project == null)
          res.json('no such user!')
        else
          project.previewLinks.push({ linkText: req.query.linkText, url: req.query.url })
          project.save (error, data) ->
            if(error)
              res.json(error)
            else
              res.json(data)
          # }}}


    k5app.addclient = (req,res) ->
      client_data =# {{{
        clientName: req.params.name

      client = new Client(client_data)
      client.save (error, data) ->
        if(error)
          res.json error
        else
          res.json data# }}}


    k5app.addClientProject = (req,res) ->
      client = new Client()# {{{
      Client.findOne {_id: req.params.id}, (error,client) ->
        if(error)
          res.json(error)
        else if(client == null)
          res.json('no such client')
        else
          client.project.push({ projectId: req.query.projectId })
          client.save (error, data) ->
            if(error)
              res.json(error)
            else
              res.json(data)
          # }}}

    k5app.addAward = (req,res) ->
      award = new Award()# {{{
      Project.findOne {_id: req.params.id}, (error,project) ->
        if(error)
          res.json(error)
        else if(award == null)
          res.json('no such user!')
        else
          project.awards.push
            name: req.params.name
            url: req.query.url
            year: req.query.year
            stamp: req.query.stamp

          project.save (error, data) ->
            if(error)
              res.json(error)
            else
              res.json(data)
          # }}}

    k5app.addMedia = (req,res) ->
      media = new Media()# {{{
      Project.findOne {_id: req.params.id}, (error,project) ->
        if(error)
          res.json(error)
        else if(media == null)
          res.json('no such user!')
        else
          project.media.push({
            format: req.params.format
            executionType: req.query.exec
            width: req.query.width
            height: req.query.height
            description: req.query.description
            title: req.query.title
            link: req.query.link
            src: req.query.src
            useInCarousel: req.query.carousel
          })
          project.save (error, data) ->
            if(error)
              res.json(error)
            else
              res.json(data)
          # }}}


    k5app.projectTags = (req,res) ->
      tag_data =
        tag: req.query.tag
        project: req.params.id

      tag = new Tag(tag_data)
      tag.save (error, data) ->
        if (error)
          res.json error
        else
          res.json data




    k5app.addServiceCat = (req,res) ->
      serviceCat_data =# {{{
        category: req.params.category

      serviceCat = new ServiceCat(serviceCat_data)
      serviceCat.save (error, data) ->
        if(error)
          res.json error
        else
          res.json data# }}}


    k5app.addServiceCatProject = (req,res) ->
      serviceCat = new ServiceCat()# {{{
      ServiceCat.findOne {_id: req.params.id}, (error,serviceCat) ->
        if(error)
          res.json(error)
        else if(serviceCat == null)
          res.json('no such category')
        else
          serviceCat.project.push({ projectId: req.query.projectId })
          serviceCat.save (error, data) ->
            if(error)
              res.json(error)
            else
              res.json(data)
          # }}}

    k5app.addPreview = (req,res) ->
      project = new Project()# {{{
      Project.findOne {_id: req.params.id}, (error,project) ->
        if(error)
          res.json(error)
        else if(project == null)
          res.json('no such project')
        else
          project.previewLinks.push({ linkText: req.params.linkText, url: req.query.url })
          project.save (error, data) ->
            if(error)
              res.json(error)
            else
              res.json(data)
          # }}}

    k5app.addmedia = (req,res) ->
      project = new Project()# {{{
      Project.findOne {project_title: req.params.project_title}, (error,project) ->
        if(error)
          res.json(error)
        else if(project == null)
          res.json('no such project')
        else
          project.media.push
            format: req.query.format
            executionType: req.query.exec
          project.save (error, data) ->
            if(error)
              res.json(error)
            else
              res.json(data)# }}}

    k5app.addawards = (req,res) ->
      project = new Project()# {{{
      Project.findOne {project_title: req.params.project_title}, (error,project) ->
        if(error)
          res.json(error)
        else if(project == null)
          res.json('no such project')
        else
          project.awards.push
            name: req.query.name
            desc: req.query.desc
            url: req.query.url
            year: req.query.year
            stamp: req.query.stamp
          project.save (error, data) ->
            if(error)
              res.json(error)
            else
              res.json(data)
          # }}}

    k5app.addtags = (req,res) ->
      project = new Project()# {{{
      Project.findOne {project_title: req.params.project_title}, (error,project) ->
        if(error)
          res.json(error)
        else if(project == null)
          res.json('no such project')
        else
          project.tags.push
            tag: req.query.tag
          project.save (error, data) ->
            if(error)
              res.json(error)
            else
              res.json(data)
          # }}}

    k5app.addworkcat = (req,res) ->
      project = new Project()# {{{
      Project.findOne {project_title: req.params.project_title}, (error,project) ->
        if(error)
          res.json(error)
        else if(project == null)
          res.json('no such project')
        else
          project.workCat.push
            val: req.query.workcat
          project.save (error, data) ->
            if(error)
              res.json(error)
            else
              res.json(data)
          # }}}

    k5app.addservicecat = (req,res) ->
      project = new Project()# {{{
      Project.findOne {project_title: req.params.project_title}, (error,project) ->
        if(error)
          res.json(error)
        else if(project == null)
          res.json('no such project')
        else
          project.serviceCat.push
            val: req.query.servicecat
          project.save (error, data) ->
            if(error)
              res.json(error)
            else
              res.json(data)
          # }}}

    crave = []
    crave.root = (req,res) ->
      console.log 'root'
      res.render 'crave-index.ejs'
    crave.map = (req,res) ->
      res.render 'map.ejs'

    app.get '/landing', crave.root
    app.get '/map', crave.map

    app.get '/testpage', getAll.projects
    app.get '/viewProject', getAll.viewProject
    app.get '/addProject', getAll.addProject
    app.get '/editProject/:id', k5app.editProject
    app.get '/listProject', k5app.listProject
    app.get '/addClient', getAll.addClient
    app.get '/listClient', k5app.listClient
    app.post '/v1/clients/:name', k5app.addclient

    app.get '/v1/projects', k5app.all
    app.get '/v1/projects/:id', k5app.getProject

    app.delete '/v1/projects/:id', k5app.remove
    app.post '/v1/projects/:projectTitle', k5app.addproj
    app.put '/v1/projects/:id/:projectTitle', k5app.updateProj

    app.get '/v1/clients', k5app.getAllClients
    app.get '/v1/clients/:id', k5app.getSingleClient
    app.post '/v1/clients/:id/project', k5app.addClientProject
    app.delete '/v1/clients/:id', k5app.removeClient
    app.delete '/v1/clients', k5app.removeAllClient

    app.get '/v1/projects/:id/previewLinks', k5app.getPreview
    app.post '/v1/projects/:id/previewLinks/:linkText', k5app.addPreview
    app.delete '/v1/projects/:id/previewLinks', k5app.delLink

    app.get '/v1/projects/:id/awards', k5app.getAward
    app.post '/v1/projects/:id/awards/:name', k5app.addAward
    app.delete '/v1/projects/:id/awards', k5app.removeAwards

    app.get '/v1/projects/:id/media', k5app.getMedia
    app.post '/v1/projects/:id/media/:format', k5app.addMedia
    app.delete '/v1/projects/:id/media', k5app.removeMedia
    app.get '/v1/media', k5app.allMedia

    app.get '/v1/tags', k5app.getTags
    app.post '/v1/tags/:tag', k5app.addTags
    app.post '/v1/tags/:id/project', k5app.projectTags
    app.delete '/v1/tags/:project', k5app.removeTags

    ### util
    ###
    app.delete '/v1/tags', k5app.removeAllTags
    app.delete '/v1/projects', k5app.removeAllProjects


    app.get '/v1/workCat', k5app.getWorkCat
    app.post '/v1/workCat/:category', k5app.addWorkCat
    app.post '/v1/workCat/:id/project', k5app.addWorkCatProject
    app.delete '/v1/workCat/:id', k5app.removeWorkCat

    app.get '/v1/serviceCat', k5app.getServiceCat
    app.post '/v1/serviceCat/:category', k5app.addServiceCat
    app.post '/v1/serviceCat/:id/project', k5app.addServiceCatProject
    app.delete '/v1/serviceCat/:id', k5app.removeServiceCat

    app.get '/v1/show/:id', (req,res) ->
      Project.findOne { _id: req.params.id },(error, doc) ->
        res.json doc


    app.get '/upload', (request, response) ->
      response.send '''# {{{
        <form method="post" enctype="multipart/form-data" action="/upload-process">
          <input type="file" name="the_file">
          <input type="submit">
        </form>
      '''# }}}

    app.post '/upload-process', (request, response) ->
      file = request.files.the_file# {{{
      file.type # filetype, like 'image/png'
      fs.rename file.path, 'tmp/' + file.name, ->
        console.log 'file renamed'
      response.send 'done'# }}}

    app.listen(process.env.PORT || 3001)


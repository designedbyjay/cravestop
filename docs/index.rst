.. K5 API documentation master file, created by
   sphinx-quickstart on Tue Aug 28 16:43:15 2012.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

Welcome to K5's API documentation!
==================================

Contents:

.. toctree::
   :maxdepth: 2



Indices and tables
==================

* :ref:`genindex`
* :ref:`modindex`
* :ref:`search`


API Endpoints
=============

Feel free to use cURL and python to look at formatted json examples.

::

    curl /v1


Projects
====

   .. sourcecode:: js


      {
        projectTitle: "sample proj",
        description: "project description",
        shortDescription: "project",
        _id: "5040c228787b3cc512000008",
        __v: 0,
        serviceCat: [ ],
        workCat: [ ],
        tags: [ ],
        awards: [ ],
        media: [ ],
        previewLinks: [ ],
        clients: [ ]
      }

  arguments


   :description: project description.
   :short: short description.
   :launched: project launch date.
   :featured: project featured.
   :sticky: project sticky boolean.
   :inLab: project inLab.


list
----

  http:method:: GET /v1/projects


   :get projects: list all projects.


create
----

  http:method:: POST /v1/projects/:projectName

   :projectName: name of project.


  *accepts all object argument parameters*


update
----

  http:method:: PUT /v1/projects/:projectId/:projectName

  *accepts all object argument parameters*

delete
----

  http:method:: DELETE /v1/projects/:projectId

   :projectId: id of project.


Clients
====


   .. sourcecode:: js

    {
      clientName: "client name",
      _id: "5040d45b97fedc8717000009"
      project: [{
        projectId: "123"
      }]
    }

list
----

  http:method:: GET /v1/clients/:clientId


   :clientId: id of client.


create
----

  http:method:: POST /v1/clients/client-name

   parameters
   :client-name: name of client.

client project
----

  http:method:: POST /v1/clients/:id/project

  arguments
  :projectId: id of project.


*delete*
----

  http:method:: DELETE /v1/clients/:clientId

   :projectId: id of project.



Preview Links
====

   .. sourcecode:: js

     {
       linkText: "preview link",
       url: "url.com/preview",
       _id: "5040c90bbe6e1b0d17000009"
     }

list
----

  http:method:: GET /v1/projects/:id/previewLinks


   :id: id of project.


create
----

  http:method:: POST /v1/project/:id/previewLinks/:linkText


   :id: id of project.
   :linkText: preview url link text.

   *arguments*

   :url: link url.


*delete*
----

  http:method:: DELETE /v1/projects/:id/previewLinks/:lid

   :id: id of project.
   :lid: preview link id.


Awards
====

list
----

  http:method:: GET /v1/project/:id/awards


   :id: id of project.


create
----


  http:method:: POST /v1/project/:id/awards/:awardName


   :id: id of project.
   :awardName: name of award.


delete
----

Media
====

list
----

  http:method:: GET /v1/projects/:id/media


   :id: id of project.


create
----


  http:method:: POST /v1/projects/:id/media/:format


   :id: id of project.
   :format: media format.
   :executionType: execution type.
   :width: width.
   :height: height.
   :description: description.
   :title: title.
   :link: link.
   :src: src.
   :carousel: use in carousel.

delete
----

  http:method:: DELETE /v1/project/:id/media

  :id: id of project.


Tags
====

list
----

  http:method:: GET /v1/tags


  params
   :tagId: id of tag.

  arguments
   :projectId: id of project.

create
----


  http:method:: POST /v1/tags/:value


   :value: value of tag.


delete
----

  http:method:: DELETE /v1/tags/:id

    :id: value of tag id.

Service Categories
====

list
----

  http:method:: GET /v1/serviceCat


   :id: id of project.


create
----

  http:method:: POST /v1/serviceCat/:category

   :id: id of project.
   :category: value service category.

delete
----

Work Categories
====

list
----

  http:method:: GET /v1/project/:id/workCat


   :id: id of project.


create
----


  http:method:: POST /v1/project/:id/workCat/:val


   :id: id of project.
   :val: value of work category.

delete
----



